import React, { useState, useRef } from 'react';
import { Button, Card, Badge, Spinner } from '../components/ui';
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
  Activity,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export default function LeafDiagnosis() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseasePredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
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

  const loadSampleImage = (diseaseSampleName: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Leaf base
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(0, 0, 224, 224);
      ctx.beginPath();
      ctx.ellipse(112, 112, 45, 95, Math.PI / 10, 0, 2 * Math.PI);
      ctx.fillStyle = '#40916c';
      ctx.fill();

      // Leaf veins
      ctx.strokeStyle = '#74c69d';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(112, 20);
      ctx.lineTo(112, 204);
      ctx.stroke();

      // Pathogen lesions
      if (diseaseSampleName === 'Blast') {
        ctx.fillStyle = '#582f0e';
        ctx.beginPath();
        ctx.ellipse(112, 95, 14, 30, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = '#e9ecef';
        ctx.beginPath();
        ctx.ellipse(112, 95, 7, 18, 0, 0, 2 * Math.PI);
        ctx.fill();
      } else if (diseaseSampleName === 'Bacterial Blight') {
        ctx.fillStyle = '#dda15e';
        ctx.beginPath();
        ctx.ellipse(135, 100, 18, 70, 0, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        ctx.fillStyle = '#4a2810';
        for (let i = 0; i < 7; i++) {
          ctx.beginPath();
          ctx.ellipse(96 + (i % 2) * 22, 55 + i * 16, 5, 8, Math.PI / 4, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const sampleFile = new File(
          [blob],
          `rice_${diseaseSampleName.toLowerCase().replace(/\s+/g, '_')}_sample.jpg`,
          { type: 'image/jpeg' }
        );
        handleFileSelect(sampleFile);
      }
    }, 'image/jpeg');
  };

  const getSeverityClass = (severity?: string) => {
    const s = severity?.toLowerCase() || '';
    if (s === 'critical') return 'diagnosis-severity-badge--critical';
    if (s === 'high') return 'diagnosis-severity-badge--high';
    return 'diagnosis-severity-badge--moderate';
  };

  return (
    <PageWrapper
      title="Leaf Diagnosis AI"
      subtitle="Upload a photo of a rice or crop leaf for deep-learning disease identification and verified treatment advice."
    >
      <div className="diagnosis-root">
        {/* Upload Panel */}
        <div className="diagnosis-upload-panel">
          <div className="diagnosis-card">
            <div className="diagnosis-card-header">
              <div className="diagnosis-header-icon">
                <Microscope size={20} className="text-white" />
              </div>
              <div>
                <h2 className="diagnosis-card-title">Upload Leaf Image</h2>
                <p className="diagnosis-card-subtitle">Accepts JPG, PNG, WEBP · Max 10MB</p>
              </div>
            </div>

            {/* Drop Zone */}
            <div
              className={`diagnosis-dropzone ${dragOver ? 'diagnosis-dropzone--active' : ''} ${preview ? 'diagnosis-dropzone--has-image' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !preview && fileInputRef.current?.click()}
            >
              {preview ? (
                <div className="diagnosis-preview">
                  <img src={preview} alt="Leaf preview" className="diagnosis-preview-img" />
                  <div className="diagnosis-preview-overlay">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                      className="diagnosis-remove-btn"
                    >
                      <X size={16} />
                      Remove
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      className="diagnosis-change-btn"
                    >
                      <Upload size={16} />
                      Change
                    </button>
                  </div>
                  <div className="diagnosis-preview-info">
                    <Leaf size={14} className="text-primary" />
                    <span className="truncate">{file?.name}</span>
                  </div>
                </div>
              ) : (
                <div className="diagnosis-empty-upload">
                  <div className="diagnosis-upload-icon">
                    <ImageIcon size={40} className="text-primary" />
                  </div>
                  <h3 className="diagnosis-upload-title">Drop your leaf image here</h3>
                  <p className="diagnosis-upload-desc">or click to browse from your device</p>
                  <div className="diagnosis-upload-tips">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); loadSampleImage('Blast'); }}
                      className="diagnosis-tip-chip hover:border-primary hover:text-white transition cursor-pointer"
                      title="Load Rice Blast sample"
                    >
                      🌿 Try Rice Blast Sample
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); loadSampleImage('Bacterial Blight'); }}
                      className="diagnosis-tip-chip hover:border-primary hover:text-white transition cursor-pointer"
                      title="Load Bacterial Blight sample"
                    >
                      🌾 Try Bacterial Blight
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); loadSampleImage('Brown Spot'); }}
                      className="diagnosis-tip-chip hover:border-primary hover:text-white transition cursor-pointer"
                      title="Load Brown Spot sample"
                    >
                      🍂 Try Brown Spot
                    </button>
                  </div>
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
                    Analyzing Pathogens…
                  </>
                ) : (
                  <>
                    <Bug size={18} />
                    Analyze Leaf
                  </>
                )}
              </button>

              <button
                type="button"
                className="diagnosis-camera-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Capture from camera"
              >
                <Camera size={20} />
              </button>
            </div>
          </div>

          {/* Tips Card */}
          <div className="diagnosis-tips-card">
            <h3 className="diagnosis-tips-title">📌 Rice Disease Identification Tips</h3>
            <div className="diagnosis-tips-list">
              {[
                { tip: 'Focus on distinct spots, lesions, or leaf tip discolorations' },
                { tip: 'Identify Bacterial Blight (wavy margins), Blast (spindle spots), or Brown Spot' },
                { tip: 'Keep background neutral and avoid intense glare or heavy shadows' },
                { tip: 'Ensure image is high-resolution for MobileNetV2 neural feature analysis' },
              ].map((t, i) => (
                <div key={i} className="diagnosis-tip-item">
                  <ChevronRight size={14} className="text-primary flex-shrink-0" />
                  <span>{t.tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="diagnosis-results-panel">
          {/* Error Message */}
          {error && (
            <div className="diagnosis-error mb-4">
              <AlertCircle size={20} className="flex-shrink-0 text-danger mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-white mb-1">Diagnosis Error</div>
                <div>{error}</div>
                <button
                  onClick={handleAnalyze}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-danger hover:underline"
                >
                  <RefreshCw size={12} /> Retry Diagnosis
                </button>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="diagnosis-card diagnosis-loading-card">
              <div className="diagnosis-loading">
                <div className="diagnosis-loading-ring">
                  <Bug size={28} className="text-danger" />
                </div>
                <p className="diagnosis-loading-title">Analyzing Rice Leaf Disease…</p>
                <p className="diagnosis-loading-sub">MobileNetV2 neural network scanning cellular lesion patterns</p>
                <div className="diagnosis-loading-steps">
                  <div className="diagnosis-step diagnosis-step--done"><CheckCircle2 size={14} /> Preprocessing image to 224×224 RGB</div>
                  <div className="diagnosis-step diagnosis-step--active"><Spinner size="sm" color="text-primary" /> Evaluating pathogen probability distribution</div>
                  <div className="diagnosis-step"><span className="w-3.5 h-3.5 rounded-full border border-border inline-block" /> Compiling agronomic treatment protocols</div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !result && (
            <div className="diagnosis-card diagnosis-empty-results">
              <div className="diagnosis-empty-icon">
                <Leaf size={40} className="text-primary" />
              </div>
              <h3 className="diagnosis-empty-title">Ready for AI Leaf Diagnosis</h3>
              <p className="diagnosis-empty-desc">
                Upload a rice leaf photo and click <strong>Analyze Leaf</strong>. The neural network detects <strong>Bacterial Blight, Rice Blast, Brown Spot,</strong> and <strong>Tungro Virus</strong> with targeted remedies.
              </p>
            </div>
          )}

          {/* Results */}
          {result && !loading && (
            <div className="space-y-4 animate-fade-in">
              {/* Main Diagnosis Card */}
              <div className="diagnosis-card diagnosis-result-main">
                <div className="diagnosis-result-header">
                  <span className={`diagnosis-severity-badge ${getSeverityClass(result.severity)}`}>
                    {result.severity} Severity
                  </span>
                  <span className="diagnosis-confidence">
                    {(result.confidence * 100).toFixed(1)}% Confidence
                  </span>
                </div>

                <div className="diagnosis-result-body">
                  {/* Image */}
                  {preview && (
                    <div className="diagnosis-result-image-wrap">
                      <img src={preview} alt="Analyzed leaf" className="diagnosis-result-img" />
                      <div className="diagnosis-result-image-overlay">
                        <span className="diagnosis-scan-label">🔬 MobileNetV2 Analyzed</span>
                      </div>
                    </div>
                  )}

                  {/* Info */}
                  <div className="diagnosis-result-info">
                    <div className="diagnosis-plant-tag">
                      <Leaf size={14} className="text-primary" />
                      <span>Host: <strong>{result.plant}</strong></span>
                    </div>
                    <h2 className="diagnosis-disease-name">{result.disease}</h2>
                    {result.pathogen && (
                      <p className="diagnosis-disease-cause">
                        {result.common_name && `${result.common_name} · `}
                        Pathogen: <em>{result.pathogen}</em>
                      </p>
                    )}

                    {/* Symptoms */}
                    {result.symptoms && result.symptoms.length > 0 && (
                      <div className="diagnosis-symptoms">
                        <h4 className="diagnosis-section-label">Diagnostic Symptoms</h4>
                        <ul className="diagnosis-symptom-list">
                          {result.symptoms.map((symptom, idx) => (
                            <li key={idx}>
                              <span className={`diagnosis-dot ${idx === 0 ? 'diagnosis-dot--red' : idx === 1 ? 'diagnosis-dot--orange' : 'diagnosis-dot--yellow'}`} />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Spread Meter */}
                    <div className="diagnosis-spread-meter">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted">Spread & Damage Risk</span>
                        <span className="font-semibold text-warning">
                          {result.spread_risk || 'Elevated'} ({result.spread_risk_score || 75}%)
                        </span>
                      </div>
                      <div className="spread-track">
                        <div
                          className="spread-fill"
                          style={{ width: `${result.spread_risk_score || 75}%` }}
                        />
                      </div>
                    </div>

                    {/* Alternative Predictions if available */}
                    {result.top_predictions && result.top_predictions.length > 1 && (
                      <div className="mt-2">
                        <h4 className="diagnosis-section-label">Class Probability Distribution</h4>
                        <div className="diagnosis-alt-list">
                          {result.top_predictions.map((p, idx) => (
                            <div key={idx} className="diagnosis-alt-row">
                              <span className="text-white font-medium">{p.disease}</span>
                              <span className="text-muted">{(p.confidence * 100).toFixed(1)}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions & Treatments */}
                <div className="diagnosis-action-cards">
                  <div className="diagnosis-action-card diagnosis-action-card--green">
                    <div className="diagnosis-action-header">
                      <CheckCircle2 size={16} className="text-primary" />
                      <strong>Recommended Interventions</strong>
                    </div>
                    <ul className="space-y-1">
                      {result.recommended_action.map((act, idx) => (
                        <li key={idx}>• {act}</li>
                      ))}
                    </ul>
                    {result.products && result.products.length > 0 && (
                      <div className="diagnosis-product-tags">
                        {result.products.map((prod, idx) => (
                          <span key={idx} className="diagnosis-product-tag">{prod}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="diagnosis-action-card diagnosis-action-card--blue">
                    <div className="diagnosis-action-header">
                      <ShieldCheck size={16} className="text-info" />
                      <strong>Preventive & Agronomic Measures</strong>
                    </div>
                    <ul className="space-y-1">
                      {result.prevention.map((prev, idx) => (
                        <li key={idx}>• {prev}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Advisory Warning */}
              <div className="diagnosis-warning">
                <AlertTriangle size={18} className="text-warning flex-shrink-0 mt-0.5" />
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
