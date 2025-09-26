-- =========================================================================
-- Estados
INSERT INTO Estados (nombre)
VALUES
('Activo'),
('Inactivo'),
('Eliminado');


-- =========================================================================
-- Estado proceso
INSERT INTO Estados_proceso (nombre)
VALUES
  ('Pendiente'),
  ('En proceso'), 
  ('Terminado');
  

-- =========================================================================
-- Tipo bitacora
INSERT INTO Tipo_bitacora (nombre)
VALUES
  ('Cambio de estado'),
  ('Asignación fallida');


-- =========================================================================
-- Roles
INSERT INTO Roles (nombre)
VALUES
  ('Administrador'),
  ('Fiscal');


-- =========================================================================
-- Departamentos
INSERT INTO Departamentos (nombre)
VALUES
('Alta Verapaz'),
('Baja Verapaz'),
('Chimaltenango'),
('Chiquimula'),
('El Progreso'),
('Escuintla'),
('Guatemala'),
('Huehuetenango'),
('Izabal'),
('Jalapa'),
('Jutiapa'),
('Petén'),
('Quetzaltenango'),
('Quiché'),
('Retalhuleu'),
('Sacatepéquez'),
('San Marcos'),
('Santa Rosa'),
('Sololá'),
('Suchitepéquez'),
('Totonicapán'),
('Zacapa');


-- =========================================================================
-- Municipios
-- Guatemala
INSERT INTO Municipios (id_departamento, nombre) VALUES
(7, 'Guatemala'),
(7, 'Villa Nueva'),
(7, 'Mixco'),
(7, 'Santa Catarina Pinula'),
(7, 'San José Pinula'),
(7, 'San José del Golfo'),
(7, 'Palencia'),
(7, 'Chinautla'),
(7, 'San Pedro Ayampuc'),
(7, 'San Pedro Sacatepéquez'),
(7, 'San Juan Sacatepéquez'),
(7, 'San Raymundo'),
(7, 'Chuarrancho'),
(7, 'Fraijanes'),
(7, 'Amatitlán'),
(7, 'Villa Canales'),
(7, 'San Miguel Petapa');

-- Sacatepéquez
INSERT INTO Municipios (id_departamento, nombre) VALUES
(16, 'Alotenango'),
(16, 'Antigua Guatemala'),
(16, 'Ciudad Vieja'),
(16, 'Jocotenango'),
(16, 'Magdalena Milpas Altas'),
(16, 'Pastores'),
(16, 'San Antonio Aguas Calientes'),
(16, 'San Bartolomé Milpas Altas'),
(16, 'San Lucas Sacatepéquez'),
(16, 'San Miguel Dueñas'),
(16, 'Santa Catarina Barahona'),
(16, 'Santa Lucía Milpas Altas'),
(16, 'Santa María de Jesús'),
(16, 'Santiago Sacatepéquez'),
(16, 'Santo Domingo Xenacoj'),
(16, 'Sumpango');



-- =========================================================================
-- Fiscalías
INSERT INTO Fiscalias(nombre, direccion, id_municipio)
VALUES 
  ('Fiscalía Contra la Corrupción - Agencia 12', 'ContralorÍa General de Cuentas 7a. Avenida 7-35 Zona 13', 1),
  ('Fiscalía de Delitos contra el Ambiente.', '11 Calle 9-38 Zona 1.', 1),
  ('Fiscalía de Delitos contra el Ambiente.', '11 Calle 9-38 Zona 1', 1),
  ('Fiscalía de Delitos contra la Propiedad Intelectual.', '7a. Avenida 11-20 Zona 1.', 1),
  ('Fiscalía Municipal', '9a. Calle 0-75 Zona 5, Colonia Pariso del Frutal', 2),
  ('Fiscalía de la Vida', '9a. Calle 0-75 Zona 5, Colonia Paraiso del Frutal.', 2);



SELECT * FROM Estados e;
SELECT * FROM Estados_Proceso ep;
SELECT * FROM Tipo_Bitacora tb;
SELECT * FROM Roles r;
SELECT * FROM Departamentos d;
SELECT * FROM Municipios m;
SELECT * FROM Fiscalias f;