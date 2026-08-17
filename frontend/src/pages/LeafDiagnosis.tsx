import React, { useState, useRef } from 'react';
import { Button, Card, Badge, Spinner } from '../components/ui';
import PageWrapper from '../components/layout/PageWrapper';
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
} from 'lucide-react';

export default function LeafDiagnosis() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setShowResults(false);
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
    setShowResults(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = () => {
    if (!file) return;
    setLoading(true);
    setShowResults(false);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <PageWrapper
      title="Leaf Diagnosis AI"
      subtitle="Upload a photo of a plant leaf for instant AI-powered disease identification and treatment advice."
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
                    <span className="diagnosis-tip-chip">📸 Clear photo</span>
                    <span className="diagnosis-tip-chip">🌿 Single leaf</span>
                    <span className="diagnosis-tip-chip">☀️ Good lighting</span>
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
                    Analyzing Disease…
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
            <h3 className="diagnosis-tips-title">📌 Tips for Better Results</h3>
            <div className="diagnosis-tips-list">
              {[
                { tip: 'Use a clear, well-lit photo of the affected leaf' },
                { tip: 'Capture both sides of the leaf if possible' },
                { tip: 'Make the leaf fill most of the frame' },
                { tip: 'Avoid blurry or dark images' },
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
          {/* Loading */}
          {loading && (
            <div className="diagnosis-card diagnosis-loading-card">
              <div className="diagnosis-loading">
                <div className="diagnosis-loading-ring">
                  <Bug size={28} className="text-danger" />
                </div>
                <p className="diagnosis-loading-title">Analyzing Leaf Disease…</p>
                <p className="diagnosis-loading-sub">Our AI is examining your image for pathogens</p>
                <div className="diagnosis-loading-steps">
                  <div className="diagnosis-step diagnosis-step--done"><CheckCircle2 size={14} /> Preprocessing image</div>
                  <div className="diagnosis-step diagnosis-step--active"><Spinner size="sm" color="text-primary" /> Identifying disease markers</div>
                  <div className="diagnosis-step"><span className="w-3.5 h-3.5 rounded-full border border-border inline-block" /> Generating treatment plan</div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !showResults && (
            <div className="diagnosis-card diagnosis-empty-results">
              <div className="diagnosis-empty-icon">
                <Leaf size={40} className="text-primary" />
              </div>
              <h3 className="diagnosis-empty-title">No Analysis Yet</h3>
              <p className="diagnosis-empty-desc">
                Upload a plant leaf image and click <strong>Analyze Leaf</strong> to get instant AI diagnosis with treatment recommendations.
              </p>
            </div>
          )}

          {/* Results */}
          {showResults && !loading && (
            <div className="space-y-4 animate-fade-in">
              {/* Main Diagnosis Card */}
              <div className="diagnosis-card diagnosis-result-main">
                <div className="diagnosis-result-header">
                  <span className="diagnosis-severity-badge diagnosis-severity-badge--moderate">Moderate</span>
                  <span className="diagnosis-confidence">89.3% Confidence</span>
                </div>

                <div className="diagnosis-result-body">
                  {/* Image */}
                  {preview && (
                    <div className="diagnosis-result-image-wrap">
                      <img src={preview} alt="Analyzed leaf" className="diagnosis-result-img" />
                      <div className="diagnosis-result-image-overlay">
                        <span className="diagnosis-scan-label">🔬 Scanned</span>
                      </div>
                    </div>
                  )}

                  {/* Info */}
                  <div className="diagnosis-result-info">
                    <div className="diagnosis-plant-tag">
                      <Leaf size={14} className="text-primary" />
                      <span>Plant: <strong>Tomato</strong></span>
                    </div>
                    <h2 className="diagnosis-disease-name">Early Blight</h2>
                    <p className="diagnosis-disease-cause">Caused by <em>Alternaria solani</em> fungus</p>

                    <div className="diagnosis-symptoms">
                      <h4 className="diagnosis-section-label">Symptoms Detected</h4>
                      <ul className="diagnosis-symptom-list">
                        <li><span className="diagnosis-dot diagnosis-dot--red" />Dark brown concentric ring spots on lower leaves</li>
                        <li><span className="diagnosis-dot diagnosis-dot--yellow" />Yellowing (chlorosis) around lesions</li>
                        <li><span className="diagnosis-dot diagnosis-dot--orange" />Slight stem infection visible</li>
                      </ul>
                    </div>

                    <div className="diagnosis-spread-meter">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted">Spread Risk</span>
                        <span className="font-semibold text-warning">Medium (65%)</span>
                      </div>
                      <div className="spread-track">
                        <div className="spread-fill" style={{ width: '65%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="diagnosis-action-cards">
                  <div className="diagnosis-action-card diagnosis-action-card--green">
                    <div className="diagnosis-action-header">
                      <CheckCircle2 size={16} className="text-primary" />
                      <strong>Recommended Treatment</strong>
                    </div>
                    <p>Apply copper-based fungicides or chlorothalonil immediately. Remove and destroy infected leaves to prevent further spread.</p>
                    <div className="diagnosis-product-tags">
                      <span className="diagnosis-product-tag">Copper Oxychloride</span>
                      <span className="diagnosis-product-tag">Mancozeb 75%</span>
                    </div>
                  </div>

                  <div className="diagnosis-action-card diagnosis-action-card--blue">
                    <div className="diagnosis-action-header">
                      <ShieldCheck size={16} className="text-info" />
                      <strong>Prevention Tips</strong>
                    </div>
                    <p>Ensure adequate plant spacing for airflow. Use drip irrigation instead of overhead watering to keep foliage dry.</p>
                    <div className="diagnosis-product-tags">
                      <span className="diagnosis-product-tag">Improve Drainage</span>
                      <span className="diagnosis-product-tag">Crop Rotation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="diagnosis-warning">
                <AlertTriangle size={18} className="text-warning flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Advisory Note:</strong> AI diagnosis is for guidance only and should not replace professional agricultural diagnosis. Consult your local agricultural expert before applying chemical treatments.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
