const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const QRCode = require('qrcode');
const { v4: uuidv4 } = require("uuid");
const Ticket = require("../models/ticketModel")
const Scanlog = require("../models/Scanlog")

exports.generateQR = async (req, res) => {
    try {
        const ticketId = uuidv4();
        const ticket = await Ticket.create({ ticketId, userId: req.user.id })
        const token = jwt.sign({ ticketId }, process.env.SECRET, { expiresIn: "5m" })
        const qr = await QRCode.toDataURL(token)
        res.status(200).json({ success: true, qr })
    } catch (error) {
        res.status(500).json({ message: "QR generation failed", error })
    }
}

exports.verifyQR = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        const ticket = await Ticket.findOneAndUpdate(
            { ticketId: decoded.ticketId, used: false },
            {
                used: true,
                usedAt: new Date(),
                scannedBy: req.user.id
            },
            { new: true }
        )
        if (!ticket) {
            return res.status(400).json({ message: "Ticket not found or already used" })
        }
        await Scanlog.create({
            ticketId: ticket._id,
            userId: ticket.userId,
            scannedBy: req.user.id,
            status: "success"
        })
        res.status(200).json({ success: true, message: "Entry allowed" })
    } catch (error) {
        res.status(500).json({ message: "invalid or expired QR", error })
    }

}
