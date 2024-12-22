const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors());

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "student.veleri.hr",
  user: "kblazevic",
  password: "11",
  database: "kblazevic",
});

app.use(express.urlencoded({ extended: true }));

/*
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
*/

app.listen(port, () => {
  console.log("Server running at port: " + port);
});

// Dohvaćanje svih ljubimaca
app.get("/api/pets", (req, res) => {
  connection.query("SELECT * FROM Ljubimac", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
  /*
      REQUEST - slanje zahtjeva s klijentske strane
      RESPONSE - slanje odgovora sa serverske strane

      npm install -g nodemon
    */
  res.send("popis_ljubimaca");
});

// Dohvaćanje jednog ljubimca prema ID-u
app.get("/api/pets/:id", (req, res) => {
  const SIFRA_LJUBIMCA = req.params.SIFRA_LJUBIMCA;
  connection.query(
    "SELECT * FROM Ljubimac WHERE SIFRA_LJUBIMCA = ?",
    [SIFRA_LJUBIMCA],
    (error, results) => {
      if (error) throw error;
      res.send(results); // Pretpostavljamo da vraćamo samo jednog ljubimca
    }
  );
});

// Dohvaćanje svih veterinara
app.get("/api/veterinari", (req, res) => {
  connection.query("SELECT * FROM Veterinar", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
  //res.send("popis_veterinara");
});

// Dohvaćanje jednog veterinara prema ID-u
app.get("/api/veterinarians/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM Veterinar WHERE SIFRA_VETERINARA = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      res.send(results[0]); // Pretpostavljamo da vraćamo samo jednog veterinara
    }
  );
});

app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM Korisnik", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 2. GET: Lista ljubimaca po vrsti životinje
app.get("/api/pets/:vrsta_zivotinje", (req, res) => {
  const vrsta_zivotinje = req.params.vrsta_zivotinje;
  connection.query(
    "SELECT Ljubimac.* FROM Ljubimac JOIN Zivotinja ON Ljubimac.SIFRA_ZIVOTINJA = Zivotinja.SIFRA_ZIVOTINJA WHERE Zivotinja.vrsta_zivotinje = ?",
    [vrsta_zivotinje],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

// 3. GET: Lista svih događaja
app.get("/api/dogadaji", (req, res) => {
  connection.query("SELECT * FROM Dogadaji", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 4. GET: Lista događaja po mjestu događaja
app.get("/api/dogadaji/:mjesto_dogadaja", (req, res) => {
  const mjesto_dogadaja = req.params.mjesto_dogadaja;
  connection.query(
    "SELECT * FROM Dogadaji WHERE mjesto_dogadaja = ?",
    [mjesto_dogadaja],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

// 5. PUT: Ažuriranje podataka o jednom korisniku
app.put("/api/users/:SIFRA_KORISNIKA", (req, res) => {
  const SIFRA_KORISNIKA = req.params.SIFRA_KORISNIKA;
  const {
    ime_korisnika,
    prezime_korisnika,
    broj_telefona_korisnika,
    email_korisnika,
    mjesto_stanovanja,
    adresa_korisnika,
  } = req.body;
  connection.query(
    "UPDATE Korisnik SET ime_korisnika = ?, prezime_korisnika =?, broj_telefona_korisnika=?, email_korisnika = ?, mjesto_stanovanja = ?, adresa_korisnika =? WHERE SIFRA_KORISNIKA = ?",
    [
      ime_korisnika,
      prezime_korisnika,
      broj_telefona_korisnika,
      email_korisnika,
      mjesto_stanovanja,
      adresa_korisnika,
      SIFRA_KORISNIKA,
    ],
    (err, results) => {
      if (err) throw err;
      res.send({ message: "Korisnik uspješno ažuriran!" });
    }
  );
});

// 6. PUT: Ažuriranje podataka o jednom ljubimcu
app.put("/api/pets/:SIFRA_LJUBIMCA", (req, res) => {
  const SIFRA_LJUBIMCA = req.params.SIFRA_LJUBIMCA;
  const {
    ime_ljubimca,
    kilaza_ljubimca,
    podaci_o_njezi_ljubimca,
    podaci_o_prehrani_ljubimca,
  } = req.body;
  connection.query(
    "UPDATE Ljubimac SET ime_ljubimca = ?, kilaza_ljubimca = ?, podaci_o_njezi_ljubimca = ?, podaci_o_prehrani_ljubimca = ? WHERE SIFRA_LJUBIMCA = ?",
    [
      ime_ljubimca,
      kilaza_ljubimca,
      podaci_o_njezi_ljubimca,
      podaci_o_prehrani_ljubimca,
      SIFRA_LJUBIMCA,
    ],
    (err, results) => {
      if (err) throw err;
      res.send({ message: "Ljubimac je uspješno ažuriran!" });
    }
  );
});

// 7. PUT: Ažuriranje podataka o jednom događaju
app.put("/api/dogadaji/:id", (req, res) => {
  const { SIFRA_DOGADAJA } = req.params.SIFRA_DOGADAJA;
  const {
    naziv_dogadaja,
    mjesto_dogadaja,
    adresa_dogadaja,
    datum_dogadaja,
    vrijeme_dogadaja,
  } = req.body;
  const query =
    "UPDATE Dogadaji SET naziv_dogadaja = ?, mjesto_dogadaja = ?, adresa_dogadaja = ?, datum_dogadaja = ?, vrijeme_dogadaja = ? WHERE SIFRA_DOGADAJA = ?";
  connection.query(
    query,
    [
      naziv_dogadaja,
      mjesto_dogadaja,
      adresa_dogadaja,
      datum_dogadaja,
      vrijeme_dogadaja,
      SIFRA_DOGADAJAIFRA_DOGADAJA,
    ],
    (err, results) => {
      if (err) throw err;
      res.send("Događaj je uspješno ažuriran.");
    }
  );
});

// 8. PUT: Ažuriranje podataka o jednom veterinaru
app.put("/api/veterinarians/:id", (req, res) => {
  const { ŠIFRA_VETERINARA } = req.params;
  const {
    ime_veterinara,
    prezime_veterinara,
    kontakt_veterinara,
    email_veterinara,
    lokacija_veterinara,
    specijalizacija_veterinara,
  } = req.body;
  const query =
    "UPDATE Veterinar SET ime_veterinara = ?, prezime_veterinara = ?, kontakt_veterinara = ?, email_veterinara = ?, lokacija_veterinara = ?, specijalizacija_veterinara = ? WHERE SIFRA_VETERINARA = ?";
  connection.query(
    query,
    [
      ime_veterinara,
      prezime_veterinara,
      kontakt_veterinara,
      email_veterinara,
      lokacija_veterinara,
      specijalizacija_veterinara,
      ŠIFRA_VETERINARA,
    ],
    (err, results) => {
      if (err) throw err;
      res.send("Veterinar je uspješno ažuriran.");
    }
  );
});

// 9. DELETE: Brisanje lijeka za određenu bolest iz zdravstvenog kartona
app.delete("/api/zdravstveniKarton/:vrsta_bolesti_ljubimca", (req, res) => {
  const vrsta_bolesti_ljubimca = req.params.vrsta_bolesti_ljubimca;
  connection.query(
    "DELETE FROM ZdravstveniKarton WHERE vrsta_bolesti_ljubimca = ?",
    [vrsta_bolesti_ljubimca],
    (err, results) => {
      if (err) throw err;
      res.send({ message: "Bolest je obrisana iz zdravstvenog kartona!" });
    }
  );
});

// 10. POST: Dodavanje u zdravstveni karton
app.post("/api/zdravstveniKarton", (req, res) => {
  const {
    simptomi_ljubimca,
    vrijeme_datum_pojave_simptoma_ljubimca,
    naziv_bolesti_ljubimnca,
    vrsta_bolesti_ljubimca,
  } = req.body;
  const query =
    "INSERT INTO ZdravstveniKarton (simptomi_ljubimca, vrijeme_datum_pojave_simptoma_ljubimca,naziv_bolesti_ljubimnca, vrsta_bolesti_ljubimca) VALUES (?, ?, ?, ?, NULL)";
  connection.query(
    query,
    [
      simptomi_ljubimca,
      vrijeme_datum_pojave_simptoma_ljubimca,
      naziv_bolesti_ljubimnca,
      vrsta_bolesti_ljubimca,
    ],
    (err, results) => {
      if (err) throw err;
      res.send("Zdravstveni obrazac dodan.");
    }
  );
});

// API endpoint for user registration
app.post("/api/registracija", (req, res) => {
  const { name, email, username, password } = req.body;

  // Validate the input data
  if (!name || !email || !username || !password) {
    return res.status(400).send("Svi podaci su obavezni.");
  }

  // Insert the user data into the database
  const query = 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, email, username, password], (error, results) => {
    if (error) {
      console.error('Greška pri unosu korisnika:', error);
      return res.status(500).send('Greška pri unosu korisnika.');
    }

    res.status(200).send("Korisnik uspješno registriran.");
  });
});

// API rute za prijavu
app.post("/api/login", (req, res) => {
  const { usernameOrEmail, password } = req.body;

  // Provjera da su oba polja unesena
  if (!usernameOrEmail || !password) {
    return res.status(400).send("Korisničko ime/email i lozinka su obavezni.");
  }

  // Provjera u bazi podataka prema korisničkom imenu ili emailu
  const query = "SELECT * FROM users WHERE username = ? OR email = ?";
  connection.query(query, [usernameOrEmail, usernameOrEmail], (error, results) => {
    if (error) {
      return res.status(500).send("Greška pri provjeri korisničkih podataka.");
    }

    if (results.length === 0) {
      return res.status(404).send("Korisničko ime ili email nisu pronađeni.");
    }

    const user = results[0];

    // Provjera lozinke
    if (password === user.password) { // U stvarnom sustavu ovdje bi trebalo koristiti hashing lozinki
      // Prijava je uspješna
      res.status(200).send({ message: "Prijava uspješna", user });
    } else {
      res.status(401).send("Pogrešna lozinka.");
    }
  });
});

/*Pokretanje servera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
