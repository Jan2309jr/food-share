import express from 'express';
import { all, get, run } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const donations = await all('SELECT * FROM donations ORDER BY createdAt DESC');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

router.get('/donor/:phone', async (req, res) => {
  try {
    const { phone } = req.params;
    const donations = await all('SELECT * FROM donations WHERE donorPhone = ? ORDER BY createdAt DESC', [phone]);
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donor donations' });
  }
});

router.post('/', async (req, res) => {
  const {
    dishName,
    servesCount,
    date,
    time,
    venue,
    donorName,
    donorPhone,
    notes,
  } = req.body;

  if (!dishName || !servesCount || !date || !time || !venue || !donorPhone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await run(
      `INSERT INTO donations (dishName, servesCount, date, time, venue, donorName, donorPhone, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [dishName, Number(servesCount), date, time, venue, donorName || null, donorPhone, notes || null]
    );
    const donation = await get('SELECT * FROM donations WHERE id = ?', [result.lastID]);
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create donation' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    dishName,
    servesCount,
    date,
    time,
    venue,
    donorName,
    donorPhone,
    notes,
  } = req.body;

  if (!dishName || !servesCount || !date || !time || !venue || !donorPhone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const donation = await get('SELECT * FROM donations WHERE id = ?', [id]);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    await run(
      `UPDATE donations
       SET dishName = ?, servesCount = ?, date = ?, time = ?, venue = ?, donorName = ?, donorPhone = ?, notes = ?
       WHERE id = ?`,
      [dishName, Number(servesCount), date, time, venue, donorName || null, donorPhone, notes || null, id]
    );

    const updatedDonation = await get('SELECT * FROM donations WHERE id = ?', [id]);
    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update donation' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await get('SELECT * FROM donations WHERE id = ?', [id]);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    await run('DELETE FROM donations WHERE id = ?', [id]);
    res.json({ success: true, id: Number(id) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete donation' });
  }
});

export default router;
