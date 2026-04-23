import React from 'react';

export default function DonationCard({ donation, onAvail, showEdit, onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="card donation-card">
      {/* Card Header */}
      <div className="donation-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.45rem' }}>🍽️ {donation.dishName}</h3>
          <p style={{ color: '#8a839c', fontSize: '0.95rem' }}>
            By {donation.donorName || 'Anonymous'}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="donation-detail" style={{ marginBottom: '1rem', flex: 1 }}>
        <div>
          <span>👥 Serves</span>
          <p>
            {donation.servesCount} {donation.servesCount === 1 ? 'person' : 'people'}
          </p>
        </div>

        <div>
          <span>📅 When</span>
          <p>
            {formatDate(donation.date)} at {donation.time}
          </p>
        </div>

        <div>
          <span>📍 Where</span>
          <p>{donation.venue}</p>
        </div>

        {donation.notes && (
          <div style={{ borderLeft: '4px solid #FFC107', background: '#fffaf1' }}>
            <span>📝 Notes</span>
            <p style={{ marginTop: '0.2rem', color: '#5d4e63' }}>{donation.notes}</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="card-actions" style={{ display: 'grid', gridTemplateColumns: showEdit ? '1fr 1fr 1fr' : '1fr', gap: '0.8rem', marginTop: 'auto' }}>
        {!showEdit && (
          <button className="btn btn-primary btn-small" onClick={onAvail} style={{ width: '100%' }}>
            ✓ Avail
          </button>
        )}
        {showEdit && (
          <>
            <button className="btn btn-secondary btn-small" onClick={onEdit} style={{ width: '100%' }}>
              ✏️ Edit
            </button>
            <button className="btn btn-danger btn-small" onClick={onDelete} style={{ width: '100%' }}>
              🗑️ Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
