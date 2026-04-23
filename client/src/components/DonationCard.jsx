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
    <div className="card" style={{ display: 'flex', flexDirection: 'column', background: 'white', height: '100%' }}>
      {/* Card Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>🍽️ {donation.dishName}</h3>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            By {donation.donorName || 'Anonymous'}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div style={{ marginBottom: '1rem', flex: 1 }}>
        <div style={{ marginBottom: '0.8rem', padding: '0.8rem', background: 'var(--cream)', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>👥 Serves</span>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--accent)', marginTop: '0.2rem' }}>
            {donation.servesCount} {donation.servesCount === 1 ? 'person' : 'people'}
          </p>
        </div>

        <div style={{ marginBottom: '0.8rem', padding: '0.8rem', background: 'var(--light-blue)', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>📅 When</span>
          <p style={{ fontSize: '0.95rem', fontWeight: 'bold', marginTop: '0.2rem' }}>
            {formatDate(donation.date)} at {donation.time}
          </p>
        </div>

        <div style={{ marginBottom: '0.8rem', padding: '0.8rem', background: 'var(--primary)', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>📍 Where</span>
          <p style={{ fontSize: '0.95rem', fontWeight: 'bold', marginTop: '0.2rem' }}>
            {donation.venue}
          </p>
        </div>

        {donation.notes && (
          <div style={{ marginBottom: '0.8rem', padding: '0.8rem', background: '#FFFAE6', borderRadius: '8px', borderLeft: '4px solid #FFC107' }}>
            <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>📝 Notes</span>
            <p style={{ fontSize: '0.9rem', marginTop: '0.2rem' }}>
              {donation.notes}
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: showEdit ? '1fr 1fr 1fr' : '1fr', gap: '0.8rem', marginTop: 'auto' }}>
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
