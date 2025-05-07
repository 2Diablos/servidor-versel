export default function handler(req, res) {
  const licencias = {
    "ABC123": { expires: "2025-12-31", user: "Juan Pérez" },
    "DEF456": { expires: "2024-06-30", user: "María López" }
  };

  const clave = req.query.key;
  if (!clave || !licencias[clave]) {
    return res.status(200).json({ valid: false, reason: "key_not_found" });
  }

  const vencimiento = new Date(licencias[clave].expires);
  const hoy = new Date();
  if (hoy <= vencimiento) {
    return res.status(200).json({ valid: true, expires: licencias[clave].expires, user: licencias[clave].user });
  } else {
    return res.status(200).json({ valid: false, reason: "expired" });
  }
}
