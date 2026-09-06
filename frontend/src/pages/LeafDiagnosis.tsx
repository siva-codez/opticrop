import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { Spinner } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';
import { predictDisease } from '../api/disease';
import type { DiseasePredictionResponse } from '../types/disease';
import {
  Camera,
  AlertTriangle,
  ShieldCheck,
  Bug,
  Image as ImageIcon,
  CheckCircle2,
  Upload,
  X,
  Microscope,
  Leaf,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  FlaskConical,
  Sprout,
  Calendar,
  Clock,
  Award,
  Layers,
  Activity,
  Info
} from 'lucide-react';

interface CropSampleOption {
  crop: string;
  emoji: string;
  samples: {
    name: string;
    label: string;
    sublabel: string;
    type: 'disease' | 'healthy';
  }[];
}

const CROP_SAMPLES: CropSampleOption[] = [
  {
    crop: 'Rice / Paddy',
    emoji: '🌾',
    samples: [
      { name: 'Rice Blast', label: 'Rice Blast', sublabel: 'Spindle lesions', type: 'disease' },
      { name: 'Bacterial Blight', label: 'Bacterial Blight', sublabel: 'Wavy margins', type: 'disease' },
      { name: 'Brown Spot', label: 'Brown Spot', sublabel: 'Sesame spots', type: 'disease' },
      { name: 'Tungro', label: 'Tungro Virus', sublabel: 'Orange-yellowing', type: 'disease' },
      { name: 'Rice Healthy', label: 'Healthy Rice Leaf', sublabel: 'Clear green foliage', type: 'healthy' },
    ]
  },
  {
    crop: 'Potato',
    emoji: '🥔',
    samples: [
      { name: 'Potato Early Blight', label: 'Early Blight', sublabel: 'Target concentric rings', type: 'disease' },
      { name: 'Potato Late Blight', label: 'Late Blight', sublabel: 'Water-soaked rot', type: 'disease' },
      { name: 'Potato Healthy', label: 'Healthy Potato Leaf', sublabel: 'Pristine canopy', type: 'healthy' },
    ]
  },
  {
    crop: 'Corn / Maize',
    emoji: '🌽',
    samples: [
      { name: 'Corn Common Rust', label: 'Common Rust', sublabel: 'Cinnamon pustules', type: 'disease' },
      { name: 'Corn Gray Leaf Spot', label: 'Gray Leaf Spot', sublabel: 'Rectangular lesions', type: 'disease' },
      { name: 'Corn Healthy', label: 'Healthy Corn Leaf', sublabel: 'Vibrant leaf blade', type: 'healthy' },
    ]
  },
  {
    crop: 'Wheat',
    emoji: '🌾',
    samples: [
      { name: 'Wheat Yellow Rust', label: 'Yellow Stripe Rust', sublabel: 'Linear yellow stripes', type: 'disease' },
      { name: 'Wheat Brown Rust', label: 'Brown Leaf Rust', sublabel: 'Orange scattered pustules', type: 'disease' },
      { name: 'Wheat Healthy', label: 'Healthy Wheat Leaf', sublabel: 'Normal flag leaf', type: 'healthy' },
    ]
  },
  {
    crop: 'Tomato & Others',
    emoji: '🍅',
    samples: [
      { name: 'Tomato Early Blight', label: 'Tomato Early Blight', sublabel: 'Concentric dark rings', type: 'disease' },
      { name: 'Tomato Late Blight', label: 'Tomato Late Blight', sublabel: 'Dark purplish blighting', type: 'disease' },
      { name: 'Tomato Healthy', label: 'Healthy Tomato', sublabel: 'Clean leaf structure', type: 'healthy' },
    ]
  }
];

export default function LeafDiagnosis() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseasePredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedCropCategory, setSelectedCropCategory] = useState<string>('Rice / Paddy');
  const [treatmentTab, setTreatmentTab] = useState<'immediate' | 'ai' | 'organic' | 'chemical' | 'prevention' | 'milestones'>('immediate');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFileSelect(droppedFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFileSelect(selected);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const data = await predictDisease(formData);
      setResult(data);
      if (data.severity?.toLowerCase() === 'healthy') {
        setTreatmentTab('prevention');
      } else if (data.immediate_actions && data.immediate_actions.length > 0) {
        setTreatmentTab('immediate');
      } else {
        setTreatmentTab('ai');
      }
    } catch (err: any) {
      console.error('Diagnosis failed:', err);
      const errorMsg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        'Diagnosis request failed. Please check backend connection.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generates synthetic 224x224 leaf sample canvases with realistic pathogen lesions
   */
  const loadSampleImage = (sampleKey: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lower = sampleKey.toLowerCase();
    const isHealthy = lower.includes('healthy');

    // 1. Background field tone
    ctx.fillStyle = '#1b3b2b';
    ctx.fillRect(0, 0, 224, 224);

    // 2. Base leaf geometry according to crop type
    if (lower.includes('corn') || lower.includes('maize') || lower.includes('wheat')) {
      // Long linear leaf blade
      ctx.fillStyle = isHealthy ? '#2d6a4f' : '#386641';
      ctx.beginPath();
      ctx.moveTo(70, 0);
      ctx.lineTo(154, 0);
      ctx.lineTo(140, 224);
      ctx.lineTo(84, 224);
      ctx.closePath();
      ctx.fill();

      // Parallel veins
      ctx.strokeStyle = '#52b788';
      ctx.lineWidth = 1;
      for (let x = 85; x <= 139; x += 9) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - 3, 224);
        ctx.stroke();
      }
    } else if (lower.includes('potato') || lower.includes('tomato')) {
      // Broad oval ovate leaf
      ctx.fillStyle = isHealthy ? '#2d6a4f' : '#40916c';
      ctx.beginPath();
      ctx.ellipse(112, 112, 62, 90, Math.PI / 16, 0, 2 * Math.PI);
      ctx.fill();

      // Veins branching
      ctx.strokeStyle = '#74c69d';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(112, 25);
      ctx.lineTo(112, 200);
      ctx.stroke();
    } else {
      // Rice leaf lanceolate
      ctx.fillStyle = isHealthy ? '#2d6a4f' : '#40916c';
      ctx.beginPath();
      ctx.ellipse(112, 112, 45, 96, Math.PI / 10, 0, 2 * Math.PI);
      ctx.fill();

      // Rice center vein
      ctx.strokeStyle = '#74c69d';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(112, 18);
      ctx.lineTo(112, 206);
      ctx.stroke();
    }

    // 3. Realistic Pathogen Lesions
    if (lower.includes('early blight')) {
      // Target concentric rings
      const centers = [{ x: 105, y: 90, r: 24 }, { x: 125, y: 145, r: 18 }];
      centers.forEach(({ x, y, r }) => {
        // Outer chlorotic halo
        ctx.fillStyle = 'rgba(234, 179, 8, 0.45)';
        ctx.beginPath();
        ctx.arc(x, y, r + 6, 0, 2 * Math.PI);
        ctx.fill();

        // Dark brown necrotic center
        ctx.fillStyle = '#3c2415';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();

        // Concentric rings
        ctx.strokeStyle = '#6f4518';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, r * 0.65, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, r * 0.35, 0, 2 * Math.PI);
        ctx.stroke();
      });
    } else if (lower.includes('late blight')) {
      // Water-soaked dark purplish rot
      ctx.fillStyle = '#281b1b';
      ctx.beginPath();
      ctx.ellipse(130, 95, 26, 45, Math.PI / 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#1a1111';
      ctx.beginPath();
      ctx.ellipse(95, 140, 22, 38, -Math.PI / 8, 0, 2 * Math.PI);
      ctx.fill();
      // White mildew margin
      ctx.strokeStyle = 'rgba(240, 240, 240, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (lower.includes('common rust')) {
      // Cinnamon/orange rust pustules
      ctx.fillStyle = '#bc4749';
      for (let i = 0; i < 18; i++) {
        const px = 90 + (i % 3) * 16 + (Math.sin(i) * 5);
        const py = 45 + i * 9;
        ctx.beginPath();
        ctx.ellipse(px, py, 4, 7, Math.PI / 12, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else if (lower.includes('gray leaf spot')) {
      // Rectangular gray lesions
      ctx.fillStyle = '#8d99ae';
      ctx.strokeStyle = '#4a5568';
      ctx.lineWidth = 1;
      const rects = [
        { x: 95, y: 55, w: 12, h: 32 },
        { x: 110, y: 100, w: 14, h: 42 },
        { x: 92, y: 150, w: 11, h: 28 }
      ];
      rects.forEach(r => {
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.strokeRect(r.x, r.y, r.w, r.h);
      });
    } else if (lower.includes('yellow rust') || lower.includes('stripe rust')) {
      // Linear yellow stripes
      ctx.fillStyle = '#f59e0b';
      for (let y = 30; y < 190; y += 8) {
        ctx.fillRect(96, y, 4, 5);
        ctx.fillRect(108, y + 2, 4, 5);
        ctx.fillRect(120, y - 2, 4, 5);
      }
    } else if (lower.includes('brown rust')) {
      // Scattered reddish-brown pustules
      ctx.fillStyle = '#9c4221';
      for (let i = 0; i < 22; i++) {
        const rx = 92 + (i * 7) % 36;
        const ry = 40 + i * 7;
        ctx.beginPath();
        ctx.arc(rx, ry, 3.5, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else if (lower.includes('blast')) {
      // Spindle diamond blast lesions
      ctx.fillStyle = '#582f0e';
      ctx.beginPath();
      ctx.ellipse(112, 95, 15, 32, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#e9ecef';
      ctx.beginPath();
      ctx.ellipse(112, 95, 8, 18, 0, 0, 2 * Math.PI);
      ctx.fill();
    } else if (lower.includes('bacterial blight')) {
      // Wavy margin lesions
      ctx.fillStyle = '#dda15e';
      ctx.beginPath();
      ctx.ellipse(135, 100, 19, 72, 0, 0, 2 * Math.PI);
      ctx.fill();
    } else if (lower.includes('brown spot')) {
      // Small sesame spots
      ctx.fillStyle = '#4a2810';
      for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        ctx.ellipse(98 + (i % 2) * 24, 52 + i * 15, 5, 8, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else if (lower.includes('tungro')) {
      // Orange-yellow chlorosis from tip
      const grad = ctx.createLinearGradient(112, 20, 112, 160);
      grad.addColorStop(0, '#f77f00');
      grad.addColorStop(0.5, '#fcbf49');
      grad.addColorStop(1, 'rgba(64, 145, 108, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(112, 90, 42, 70, 0, 0, 2 * Math.PI);
      ctx.fill();
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const cleanName = sampleKey.toLowerCase().replace(/\s+/g, '_');
        const sampleFile = new File([blob], `${cleanName}_leaf_sample.jpg`, { type: 'image/jpeg' });
        handleFileSelect(sampleFile);
      }
    }, 'image/jpeg');
  };

  const getSeverityBadge = (severity?: string) => {
    const s = severity?.toLowerCase() || '';
    if (s === 'critical') return 'bg-red-500/15 text-red-700 border-red-300 animate-pulse';
    if (s === 'high') return 'bg-rose-500/15 text-rose-700 border-rose-300';
    if (s === 'healthy') return 'bg-emerald-500/15 text-emerald-800 border-emerald-300';
    return 'bg-amber-500/15 text-amber-700 border-amber-300';
  };

  const getPathogenBadgeColor = (type?: string) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('bacterial')) return 'bg-orange-50 text-orange-700 border-orange-200';
    if (t.includes('viral')) return 'bg-purple-50 text-purple-700 border-purple-200';
    if (t.includes('oomycete')) return 'bg-rose-50 text-rose-700 border-rose-200';
    if (t.includes('healthy')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  return (
    <PageWrapper
      title="Multi-Crop Disease Diagnosis with AI"
      subtitle="Upload leaf photos of Rice, Potato, Corn, Wheat, Tomato, or other crops to detect foliar diseases and receive clinical treatments."
      breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: 'Disease Diagnosis' },
      ]}
      action={
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 px-3.5 py-2 rounded-xl border border-emerald-200/60 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Services</span>
        </Link>
      }
    >
      <div className="diagnosis-root">
        {/* Left: Upload & Crop Sample Selection Panel */}
        <div className="diagnosis-left-panel">
          <div className="diagnosis-upload-card">
            <div className="diagnosis-card-header">
              <div className="diagnosis-card-icon">
                <Microscope size={20} />
              </div>
              <div className="flex-1">
                <h2 className="diagnosis-card-title">Upload Crop Leaf Photo</h2>
                <p className="diagnosis-card-sub">Supports Multi-Crop ViT Model · JPG, PNG, WEBP · Max 10MB</p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800">
                <Sparkles size={12} className="text-emerald-600" />
                <span>ViT Multi-Crop AI</span>
              </div>
            </div>

            {/* Drop Zone */}
            <div
              className={`diagnosis-dropzone ${dragOver ? 'diagnosis-dropzone--drag-over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !preview && fileInputRef.current?.click()}
            >
              {preview ? (
                <div className="diagnosis-preview-wrap w-full">
                  <div className="relative rounded-xl overflow-hidden border border-emerald-200 shadow-2xs">
                    <img src={preview} alt="Leaf preview" className="w-full max-h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 flex flex-col justify-between p-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                          className="px-2.5 py-1 rounded-lg bg-red-600/90 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                        >
                          <X size={14} /> Remove
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                          className="px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-gray-900 text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                        >
                          <Upload size={14} /> Replace
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-white text-xs font-medium truncate">
                        <Leaf size={14} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{file?.name || 'Selected Leaf Sample'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  <div className="diagnosis-upload-icon mx-auto">
                    <ImageIcon size={32} />
                  </div>
                  <h3 className="diagnosis-upload-title">Drop your leaf photo here</h3>
                  <p className="diagnosis-upload-desc">or click to browse from your device</p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleInputChange}
            />

            {/* Actions */}
            <div className="diagnosis-actions">
              <button
                onClick={handleAnalyze}
                disabled={!file || loading}
                className={`diagnosis-analyze-btn ${(!file || loading) ? 'diagnosis-analyze-btn--disabled' : ''}`}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" color="text-white" />
                    Running ViT Multi-Crop Neural Scan…
                  </>
                ) : (
                  <>
                    <Bug size={18} />
                    Run AI Disease Diagnosis
                  </>
                )}
              </button>

              <button
                type="button"
                className="diagnosis-camera-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Capture from camera or browse"
              >
                <Camera size={20} />
              </button>
            </div>

            {/* Quick Interactive Multi-Crop Sample Selector */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <Sprout size={14} className="text-emerald-600" />
                  Try Instant Multi-Crop Leaf Samples:
                </span>
                <span className="text-[11px] text-gray-500 font-medium">Click to load test image</span>
              </div>

              {/* Crop category selector tabs */}
              <div className="flex items-center gap-1 mb-3 overflow-x-auto no-scrollbar pb-1">
                {CROP_SAMPLES.map((cat) => (
                  <button
                    key={cat.crop}
                    type="button"
                    onClick={() => setSelectedCropCategory(cat.crop)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCropCategory === cat.crop
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                    }`}
                  >
                    <span>{cat.emoji}</span> {cat.crop}
                  </button>
                ))}
              </div>

              {/* Sample disease pills for active category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CROP_SAMPLES.find(c => c.crop === selectedCropCategory)?.samples.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => loadSampleImage(s.name)}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      s.type === 'healthy'
                        ? 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/70 text-emerald-900'
                        : 'bg-white border-gray-200 hover:border-emerald-400 hover:shadow-2xs text-gray-800'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">
                        {s.type === 'healthy' ? '🌿' : '🍂'} {s.label}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate">{s.sublabel}</div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded shrink-0">
                      Load
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostic Tips Card */}
          <div className="diagnosis-tips-card">
            <h3 className="diagnosis-tips-title flex items-center gap-1.5">
              <Info size={15} className="text-emerald-600" />
              Multi-Crop Field Scouting Guidelines
            </h3>
            <div className="diagnosis-tips-list">
              {[
                { tip: 'Potato & Tomato: Check lower canopy for bullseye concentric rings (Early Blight) or dark water-soaked rot (Late Blight).' },
                { tip: 'Corn / Maize: Differentiate between circular rust pustules (Common Rust) vs long rectangular gray lesions (Gray Leaf Spot).' },
                { tip: 'Rice / Paddy: Inspect for spindle-shaped lesions with gray centers (Blast) or wavy edge margin blight.' },
                { tip: 'Wheat: Look for bright linear yellow stripe streaks on flag leaves (Stripe Rust) or scattered brown spots.' },
                { tip: 'Lighting: Capture photos in natural diffused morning daylight without harsh camera flash or heavy shadows.' },
              ].map((t, i) => (
                <div key={i} className="diagnosis-tip-item">
                  <ChevronRight size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{t.tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Results & Treatment Panel */}
        <div className="diagnosis-right-panel">
          {/* Error Banner */}
          {error && (
            <div className="diagnosis-error mb-4">
              <AlertCircle size={20} className="flex-shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-red-900 mb-1">Diagnosis Error</div>
                <div className="text-xs text-red-800">{error}</div>
                <button
                  onClick={handleAnalyze}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-red-700 hover:underline cursor-pointer"
                >
                  <RefreshCw size={12} /> Retry Diagnosis
                </button>
              </div>
            </div>
          )}

          {/* Loading View */}
          {loading && (
            <div className="diagnosis-upload-card diagnosis-loading-card">
              <div className="diagnosis-loading">
                <div className="diagnosis-loading-ring">
                  <Microscope size={28} className="text-emerald-700" />
                </div>
                <p className="diagnosis-loading-title">Analyzing Crop Leaf Pathology…</p>
                <p className="diagnosis-loading-sub">Hugging Face Vision Transformer (ViT) evaluating multi-crop visual signatures</p>
                <div className="diagnosis-loading-steps">
                  <div className="diagnosis-step diagnosis-step--done">
                    <CheckCircle2 size={14} /> Normalizing RGB tensor (224×224)
                  </div>
                  <div className="diagnosis-step diagnosis-step--active">
                    <Spinner size="sm" color="text-emerald-700" /> Multi-crop deep attention layer inference
                  </div>
                  <div className="diagnosis-step">
                    <span className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block" /> Synthesizing agronomic treatment plan
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty Ready State */}
          {!loading && !result && (
            <div className="diagnosis-upload-card diagnosis-empty-results">
              <div className="diagnosis-empty-icon">
                <Leaf size={40} className="text-emerald-700" />
              </div>
              <h3 className="diagnosis-empty-title">Ready for Multi-Crop Leaf Diagnosis</h3>
              <p className="diagnosis-empty-desc">
                Upload a plant photo or choose a sample above. The Vision Transformer model supports <strong>Rice, Potato, Corn, Wheat, Tomato,</strong> and other crops with clinical prescriptions, organic biocontrols, and 7-day recovery schedules.
              </p>
            </div>
          )}

          {/* Results State */}
          {result && !loading && (
            <div className="space-y-4 animate-fade-in">
              <div className="diagnosis-upload-card">
                {/* Result Top Header */}
                <div className="diagnosis-result-header">
                  <div className="flex items-center gap-2">
                    <span className={`diagnosis-severity-badge border ${getSeverityBadge(result.severity)}`}>
                      {result.severity === 'Healthy' ? '✨ Healthy Plant' : `${result.severity} Severity`}
                    </span>
                    {result.pathogen_type && (
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getPathogenBadgeColor(result.pathogen_type)}`}>
                        {result.pathogen_type}
                      </span>
                    )}
                  </div>
                  <span className="diagnosis-confidence">
                    {(result.confidence * 100).toFixed(1)}% Confidence
                  </span>
                </div>

                {/* Body Details */}
                <div className="diagnosis-result-body">
                  {/* Analyzed Image preview */}
                  {preview && (
                    <div className="diagnosis-result-image-wrap">
                      <img src={preview} alt="Diagnosed leaf" className="diagnosis-result-img" />
                      <div className="diagnosis-result-image-overlay">
                        <span className="diagnosis-scan-label">
                          🔬 {result.model_source || 'ViT (wambugu71/crop_leaf_diseases_vit)'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Disease Info & Symptoms */}
                  <div className="diagnosis-result-info">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="diagnosis-plant-tag">
                        <Leaf size={14} />
                        <span>Host Crop: <strong>{result.plant}</strong></span>
                      </div>
                      <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        ViT Deep Learning
                      </span>
                    </div>

                    <h2 className="diagnosis-disease-name">{result.disease}</h2>

                    {result.pathogen && (
                      <p className="diagnosis-disease-cause">
                        {result.common_name && `${result.common_name} · `}
                        Pathogen: <em>{result.pathogen}</em>
                      </p>
                    )}

                    {/* Diagnostic Symptoms */}
                    {result.symptoms && result.symptoms.length > 0 && (
                      <div className="diagnosis-symptoms">
                        <h4 className="diagnosis-section-label">Diagnostic Visual Symptoms</h4>
                        <ul className="diagnosis-symptom-list">
                          {result.symptoms.map((symptom, idx) => (
                            <li key={idx}>
                              <span className={`diagnosis-dot ${
                                result.severity === 'Healthy'
                                  ? 'bg-emerald-500'
                                  : idx === 0
                                  ? 'diagnosis-dot--red'
                                  : idx === 1
                                  ? 'diagnosis-dot--orange'
                                  : 'diagnosis-dot--yellow'
                              }`} />
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Spread & Field Contagion Risk Meter */}
                    {result.severity !== 'Healthy' && (
                      <div className="diagnosis-spread-meter">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted font-medium flex items-center gap-1">
                            <Activity size={12} className="text-orange-500" />
                            Field Contagion & Spread Risk
                          </span>
                          <span className="font-semibold text-amber-700">
                            {result.spread_risk || 'Elevated'} ({result.spread_risk_score || 70}%)
                          </span>
                        </div>
                        <div className="spread-track">
                          <div
                            className="spread-fill"
                            style={{ width: `${result.spread_risk_score || 70}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Top Neural Alternative Predictions */}
                    {result.top_predictions && result.top_predictions.length > 1 && (
                      <div className="mt-2">
                        <h4 className="diagnosis-section-label flex items-center gap-1">
                          <Layers size={12} />
                          Top Neural Network Predictions
                        </h4>
                        <div className="diagnosis-alt-list">
                          {result.top_predictions.slice(0, 4).map((p, idx) => (
                            <div key={idx} className="diagnosis-alt-row">
                              <span className="text-gray-900 font-medium">{p.disease}</span>
                              <span className="text-emerald-700 font-mono text-xs font-bold">
                                {(p.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ──────────────────────────────────────────────────────────
                    INTERACTIVE AGRONOMIC TREATMENT & RECOVERY HUB
                   ────────────────────────────────────────────────────────── */}
                <div className="m-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/50 border border-emerald-200 shadow-2xs">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          AI Agronomist Clinical Advisory
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-2 py-0.5 rounded-full">
                            ICAR / Extension Validated
                          </span>
                        </h3>
                        <p className="text-[11px] text-gray-500">Comprehensive treatment protocol for {result.disease}</p>
                      </div>
                    </div>

                    {/* Ask AI Assistant Button */}
                    <button
                      type="button"
                      onClick={() => navigate('/services/assistant', {
                        state: {
                          initialPrompt: `I diagnosed my ${result.plant} with ${result.disease} (${(result.confidence * 100).toFixed(1)}% confidence, ${result.severity} severity). Can you provide a day-by-day 7-day spray schedule, exact chemical or organic dosage per acre, and weather precautions?`
                        }
                      })}
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageSquare size={13} />
                      <span>Ask AI for 7-Day Plan</span>
                    </button>
                  </div>

                  {/* AI Solution Summary Text */}
                  {result.ai_solution && (
                    <div className="p-3.5 rounded-xl bg-white border border-emerald-100 text-xs sm:text-sm text-gray-800 leading-relaxed shadow-2xs mb-3">
                      <p className="whitespace-pre-wrap">{result.ai_solution}</p>
                    </div>
                  )}

                  {/* Treatment Navigation Tabs */}
                  <div className="flex items-center gap-1.5 border-b border-emerald-200/70 pb-2 mb-3 overflow-x-auto no-scrollbar">
                    {result.immediate_actions && result.immediate_actions.length > 0 && result.severity !== 'Healthy' && (
                      <button
                        type="button"
                        onClick={() => setTreatmentTab('immediate')}
                        className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                          treatmentTab === 'immediate'
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'text-red-700 hover:bg-red-50'
                        }`}
                      >
                        🚨 Immediate Actions (Day 1-2)
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setTreatmentTab('ai')}
                      className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        treatmentTab === 'ai'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      ✨ Recommended Protocol
                    </button>
                    <button
                      type="button"
                      onClick={() => setTreatmentTab('organic')}
                      className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        treatmentTab === 'organic'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      🌿 Organic Biocontrols
                    </button>
                    <button
                      type="button"
                      onClick={() => setTreatmentTab('chemical')}
                      className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        treatmentTab === 'chemical'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      🧪 Chemical Prescriptions
                    </button>
                    <button
                      type="button"
                      onClick={() => setTreatmentTab('prevention')}
                      className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        treatmentTab === 'prevention'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      🛡️ Prevention & Cultivars
                    </button>
                    {result.recovery_milestones && result.recovery_milestones.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setTreatmentTab('milestones')}
                        className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                          treatmentTab === 'milestones'
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        📅 Recovery Timeline
                      </button>
                    )}
                  </div>

                  {/* Tab: Immediate Actions */}
                  {treatmentTab === 'immediate' && (
                    <div className="space-y-2 text-xs">
                      <p className="text-[11px] text-red-700 font-semibold flex items-center gap-1">
                        <AlertTriangle size={13} />
                        Execute these urgent containment measures within 24–48 hours:
                      </p>
                      <ul className="space-y-1.5">
                        {(result.immediate_actions || []).map((act, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-800 bg-red-50/60 p-2 rounded-lg border border-red-200">
                            <span className="h-5 w-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tab: Recommended Protocol */}
                  {treatmentTab === 'ai' && (
                    <div className="space-y-2 text-xs">
                      <ul className="space-y-1.5">
                        {result.recommended_action.map((act, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-800">
                            <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                      {result.products && result.products.length > 0 && (
                        <div className="pt-2">
                          <div className="text-[11px] font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                            <FlaskConical size={12} className="text-emerald-700" />
                            Approved Agrochemical & Bio Formulations:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {result.products.map((prod, idx) => (
                              <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-100/70 border border-emerald-300 text-emerald-950 text-[11px] font-semibold">
                                {prod}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab: Organic Biocontrols */}
                  {treatmentTab === 'organic' && (
                    <div className="space-y-2 text-xs">
                      <p className="text-[11px] text-gray-500 font-medium">Safe for beneficial pollinators, soil microbiome, and organic export compliance:</p>
                      <ul className="space-y-1.5">
                        {(result.organic_remedies && result.organic_remedies.length > 0
                          ? result.organic_remedies
                          : [
                              'Neem Seed Kernel Extract (NSKE 5%) spray @ 50 ml/L at initial symptom onset',
                              'Trichoderma viride bio-fungicide @ 2.5 kg/acre mixed with well-decomposed organic manure',
                              'Pseudomonas fluorescens 1% WP foliar spray @ 10 g/L for induced systemic resistance'
                            ]
                        ).map((rem, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-800 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                            <Sprout size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                            <span>{rem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tab: Chemical Prescriptions */}
                  {treatmentTab === 'chemical' && (
                    <div className="space-y-2 text-xs">
                      <p className="text-[11px] text-gray-500 font-medium">Standard therapeutic compounds with exact dilution and dosage per acre:</p>
                      <ul className="space-y-1.5">
                        {(result.chemical_remedies && result.chemical_remedies.length > 0
                          ? result.chemical_remedies
                          : result.recommended_action
                        ).map((rem, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-800 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                            <FlaskConical size={14} className="text-blue-600 mt-0.5 shrink-0" />
                            <span>{rem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tab: Prevention & Cultivars */}
                  {treatmentTab === 'prevention' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="text-[11px] text-gray-500 font-medium mb-1.5">Agronomic preventive measures for next cultivation cycle:</p>
                        <ul className="space-y-1.5">
                          {result.prevention.map((prev, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-800">
                              <ShieldCheck size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                              <span>{prev}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {result.resistant_varieties && result.resistant_varieties.length > 0 && (
                        <div className="pt-2 border-t border-emerald-100">
                          <div className="text-[11px] font-bold text-gray-800 mb-1.5 flex items-center gap-1">
                            <Award size={13} className="text-emerald-700" />
                            Recommended Disease-Resistant Cultivars:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {result.resistant_varieties.map((varName, idx) => (
                              <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-900 text-[11px] font-semibold shadow-2xs">
                                🌾 {varName}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab: Recovery Milestones */}
                  {treatmentTab === 'milestones' && (
                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {result.recovery_milestones?.map((m, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 mb-1">
                              <Calendar size={13} />
                              <span>{m.phase}</span>
                            </div>
                            <div className="text-[11px] font-semibold text-gray-900 mb-1">{m.timeline}</div>
                            <div className="text-[11px] text-gray-600 leading-relaxed">{m.action}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mobile consultation CTA */}
                  <div className="mt-3 pt-3 border-t border-emerald-200/60 sm:hidden">
                    <button
                      type="button"
                      onClick={() => navigate('/services/assistant', {
                        state: {
                          initialPrompt: `I detected ${result.disease} on my ${result.plant}. Can you provide a day-by-day 7-day spray schedule, exact chemical or organic dosage per acre, and weather precautions?`
                        }
                      })}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <MessageSquare size={14} />
                      <span>Consult AI Assistant About This Disease</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Advisory Warning Note */}
              <div className="diagnosis-warning">
                <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>AgriAI Advisory Note:</strong> {result.disclaimer}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
