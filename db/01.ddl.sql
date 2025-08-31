USE db_mp;

-- ============================
-- Tabla Estados
CREATE TABLE Estados (
  id_estado INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(50) NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL
);

-- ============================
-- Tabla Departamentos
CREATE TABLE Departamentos (
  id_departamento INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(50) NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL
);

-- ============================
-- Tabla Municipios
CREATE TABLE Municipios (
  id_municipio INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(50) NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL,
  id_departamento INT NOT NULL,
  CONSTRAINT fk_departamento_municipio FOREIGN KEY (id_departamento) REFERENCES Departamentos(id_departamento)
);

-- ============================
-- Tabla Fiscalias
CREATE TABLE Fiscalias (
  id_fiscalia INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(100) NOT NULL,
  direccion NVARCHAR(255) NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL,
  id_estado INT NOT NULL DEFAULT 1,
  id_municipio INT NOT NULL,
  CONSTRAINT fk_estado_fiscalia FOREIGN KEY (id_estado) REFERENCES Estados(id_estado),
  CONSTRAINT fk_municipio_fiscalia FOREIGN KEY (id_municipio) REFERENCES Municipios(id_municipio)
);

-- ============================
-- Tabla Usuarios
CREATE TABLE Usuarios (
  id_usuario INT IDENTITY(1,1) PRIMARY KEY,
  no_identificacion NVARCHAR(30) NOT NULL UNIQUE,
  nombres NVARCHAR(50) NOT NULL,
  apellidos NVARCHAR(50) NOT NULL,
  fecha_nac DATE NOT NULL,
  correo NVARCHAR(100) NOT NULL,
  contrasenia NVARCHAR(255) NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL,
  id_estado INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_estado_usuario FOREIGN KEY (id_estado) REFERENCES Estados(id_estado)
);

-- ============================
-- Tabla Roles
CREATE TABLE Roles (
  id_rol INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(50) NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL
);

-- ============================
-- Tabla Usuario_Roles
CREATE TABLE Usuario_Roles (
  id_usuario_rol INT IDENTITY(1,1) PRIMARY KEY,
  id_rol INT NOT NULL,
  id_usuario INT NOT NULL,
  id_estado INT NOT NULL DEFAULT 1,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL,
  CONSTRAINT fk_rol_usuarioroles FOREIGN KEY (id_rol) REFERENCES Roles(id_rol),
  CONSTRAINT fk_usuario_usuarioroles FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
  CONSTRAINT fk_estado_usuariroles FOREIGN KEY (id_estado) REFERENCES Estados(id_estado)
);

-- ============================
-- Tabla Fiscalia_Usuarios
CREATE TABLE Fiscalia_Usuarios (
  id_fiscalia_usuario INT IDENTITY(1,1) PRIMARY KEY,
  id_fiscalia INT NOT NULL,
  id_usuario INT NOT NULL,
  id_estado INT NOT NULL DEFAULT 1,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL,
  CONSTRAINT fk_fiscalia_fiscaliausuario FOREIGN KEY (id_fiscalia) REFERENCES Fiscalias(id_fiscalia),
  CONSTRAINT fk_usuario_fiscaliasuario FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
  CONSTRAINT fk_estado_fiscaliausuario FOREIGN KEY (id_estado) REFERENCES Estados(id_estado)
);

-- ============================
-- Tabla Estados_Proceso
CREATE TABLE Estados_Proceso (
  id_estado_proceso INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(50) NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL
);

-- ============================
-- Tabla Casos
-- ============================
CREATE TABLE Casos (
  id_caso INT IDENTITY(1,1) PRIMARY KEY,
  titulo NVARCHAR(100) NOT NULL,
  descripcion NVARCHAR(MAX) NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL,
  id_estado INT NOT NULL DEFAULT 1,
  id_estado_proceso INT NOT NULL,
  id_fiscalia INT NOT NULL,
  CONSTRAINT fk_estado_caso FOREIGN KEY (id_estado) REFERENCES Estados(id_estado),
  CONSTRAINT fk_estadoproceso_caso FOREIGN KEY (id_estado_proceso) REFERENCES Estados_Proceso(id_estado_proceso),
  CONSTRAINT fk_fiscalia_caso FOREIGN KEY (id_fiscalia) REFERENCES Fiscalias(id_fiscalia)
);

-- ============================
-- Tabla Asignaciones_Caso
CREATE TABLE Asignaciones_Caso (
  id_asignacion INT IDENTITY(1,1) PRIMARY KEY,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL,
  id_caso INT NOT NULL,
  id_usuario INT NOT NULL,
  id_estado INT NOT NULL DEFAULT 1,
  CONSTRAINT fK_caso_asignacion FOREIGN KEY (id_caso) REFERENCES Casos(id_caso),
  CONSTRAINT fk_usuario_asignacion FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
  CONSTRAINT fk_estado_asignacion FOREIGN KEY (id_estado) REFERENCES Estados(id_estado)
);

-- ============================
-- Tabla Tipo_Bitacora
CREATE TABLE Tipo_Bitacora (
  id_tipo_bitacora INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(50) NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  fecha_actualizacion DATETIME NULL
);

-- ============================
-- Tabla Bitacora_Caso
CREATE TABLE Bitacora_Caso (
  id_bitacora INT IDENTITY(1,1) PRIMARY KEY,
  fecha DATETIME NOT NULL DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Central America Standard Time'),
  motivo NVARCHAR(MAX) NULL,
  id_caso INT NOT NULL,
  id_estado INT NOT NULL DEFAULT 1,
  id_tipo_bitacora INT NOT NULL,
  id_estado_proceso_anterior INT NULL,
  id_estado_proceso_actual INT NULL,
  id_usuario_anterior INT NULL,
  id_usuario_actual INT NULL,
  CONSTRAINT FK_Bitacora_Caso FOREIGN KEY (id_caso) REFERENCES Casos(id_caso),
  CONSTRAINT FK_Bitacora_Estado FOREIGN KEY (id_estado) REFERENCES Estados(id_estado),
  CONSTRAINT FK_Bitacora_Tipo FOREIGN KEY (id_tipo_bitacora) REFERENCES Tipo_Bitacora(id_tipo_bitacora),
  CONSTRAINT FK_Bitacora_EstadoProcAnt FOREIGN KEY (id_estado_proceso_anterior) REFERENCES Estados_Proceso(id_estado_proceso),
  CONSTRAINT FK_Bitacora_EstadoProcAct FOREIGN KEY (id_estado_proceso_actual) REFERENCES Estados_Proceso(id_estado_proceso),
  CONSTRAINT FK_Bitacora_UsuarioAnt FOREIGN KEY (id_usuario_anterior) REFERENCES Usuarios(id_usuario),
  CONSTRAINT FK_Bitacora_UsuarioAct FOREIGN KEY (id_usuario_actual) REFERENCES Usuarios(id_usuario)
);





-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_existeUsuario
    @no_identificacion NVARCHAR(30)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        CASE 
            WHEN EXISTS (
                SELECT 1
                FROM Usuarios
                WHERE no_identificacion = @no_identificacion
            ) 
            THEN CAST(1 AS BIT) 
            ELSE CAST(0 AS BIT) 
        END AS Existe;
END;




-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_crearUsuario
    @no_identificacion NVARCHAR(30),
    @nombres NVARCHAR(50),
    @apellidos NVARCHAR(50),
    @fecha_nac DATE,
    @correo NVARCHAR(100),
    @contrasenia NVARCHAR(255),
    @roles NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Usuarios (no_identificacion, nombres, apellidos, fecha_nac, correo, contrasenia)
        VALUES (@no_identificacion, @nombres, @apellidos, @fecha_nac, @correo, @contrasenia);

        DECLARE @id_usuario INT = SCOPE_IDENTITY();

        INSERT INTO Usuario_Roles (id_usuario, id_rol)
        SELECT @id_usuario, value
        FROM OPENJSON(@roles);

        COMMIT TRANSACTION;

        SELECT 1 AS success, @id_usuario AS id_usuario;

    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SELECT 0 AS success;
    END CATCH
END;


-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_getUsuarioLogin
    @no_identificacion NVARCHAR(30)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.id_usuario,
        u.no_identificacion,
        u.nombres,
        u.apellidos,
        u.fecha_nac,
        u.correo,
        u.contrasenia,
        r.id_rol,
        r.nombre AS rol
    FROM Usuarios u
    INNER JOIN Usuario_Roles ur ON u.id_usuario = ur.id_usuario
    INNER JOIN Roles r ON ur.id_rol = r.id_rol
    WHERE u.no_identificacion = @no_identificacion
      AND u.id_estado = 1
      AND ur.id_estado = 1;
END;


-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_getFiscaliasActivas
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        f.id_fiscalia as id,
        f.nombre,
        f.direccion,
        m.nombre as municipio,
        d.nombre as departamento
    FROM Fiscalias f
    INNER JOIN Municipios m ON f.id_municipio = m.id_municipio 
    INNER JOIN Departamentos d ON m.id_departamento = d.id_departamento
    WHERE f.id_estado = 1;
END;


-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_InsertarCaso
    @titulo NVARCHAR(100),
    @descripcion NVARCHAR(MAX),
    @id_estado_proceso INT,
    @id_fiscalia INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Casos (titulo, descripcion, id_estado_proceso, id_fiscalia)
    VALUES (@titulo, @descripcion, @id_estado_proceso, @id_fiscalia);

    -- Retornar el ID del nuevo caso insertado
    SELECT SCOPE_IDENTITY() AS id_caso;
END;



-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_getFiscalia
    @id_fiscalia INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        id_fiscalia,
        nombre,
        direccion,
        fecha_creacion,
        fecha_actualizacion,
        id_estado,
        id_municipio
    FROM Fiscalias
    WHERE id_fiscalia = @id_fiscalia;
END;


-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_getCase
    @id_caso INT
AS
BEGIN
    SELECT 
        c.id_caso,
        c.titulo,
        c.descripcion,
        c.id_estado,
        e.nombre AS "estado",
        c.id_estado_proceso,
        ep.nombre AS "proceso",
        c.fecha_creacion,
        c.id_fiscalia,
        ac.id_asignacion,
        ac.id_usuario	
    FROM Casos c
    LEFT JOIN Asignaciones_Caso ac ON c.id_caso = ac.id_caso AND ac.id_estado = 1
    INNER JOIN Estados e ON c.id_estado = e.id_estado 
    INNER JOIN Estados_Proceso ep ON c.id_estado_proceso = ep.id_estado_proceso 
    WHERE c.id_caso = @id_caso;
END;

-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_UsuariosPorFiscalia
    @id_fiscalia INT = NULL,
    @id_usuario INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.id_usuario,
        u.nombres,
        u.apellidos,
        u.no_identificacion,
        fu.id_fiscalia_usuario,
        fu.id_fiscalia 
    FROM Usuarios u
    INNER JOIN Fiscalia_Usuarios fu ON u.id_usuario = fu.id_usuario 
    WHERE u.id_estado = 1 
      AND fu.id_estado = 1
      AND (@id_fiscalia IS NULL OR fu.id_fiscalia = @id_fiscalia)
      AND (@id_usuario IS NULL OR u.id_usuario = @id_usuario);
END;

-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_ActualizarYAsignarCaso
    @id_caso INT,
    @id_usuario INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        IF EXISTS (SELECT 1 FROM Asignaciones_Caso WHERE id_caso = @id_caso)
        BEGIN
            UPDATE Asignaciones_Caso
            SET id_estado = 3
            WHERE id_caso = @id_caso;
        END

        INSERT INTO Asignaciones_Caso (id_caso, id_usuario)
        VALUES (@id_caso, @id_usuario);

        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH
END;


-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_CambiarEstadoCaso
    @id_caso INT,
    @id_estado_proceso_actual INT,
    @id_usuario_actual INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @id_estado_proceso_anterior INT;

    SELECT @id_estado_proceso_anterior = id_estado_proceso
    FROM Casos
    WHERE id_caso = @id_caso;

    UPDATE Casos
    SET id_estado_proceso = @id_estado_proceso_actual
    WHERE id_caso = @id_caso;

    INSERT INTO Bitacora_Caso(
        id_caso, 
        id_tipo_bitacora, 
        id_estado_proceso_anterior, 
        id_estado_proceso_actual, 
        id_usuario_actual
    )
    VALUES (
        @id_caso, 
        1, 
        @id_estado_proceso_anterior, 
        @id_estado_proceso_actual, 
        @id_usuario_actual
    );
END;





-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_AgregarLogFallido
    @id_caso INT,
    @id_usuario_actual INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @id_usuario_anterior INT;

    SELECT TOP 1 @id_usuario_anterior = ac.id_usuario
    FROM Asignaciones_Caso ac
    WHERE ac.id_caso = @id_caso 
      AND ac.id_estado = 1
    ORDER BY ac.fecha_creacion DESC;

    INSERT INTO Bitacora_Caso(
        id_caso, 
        id_tipo_bitacora, 
        id_usuario_anterior, 
        id_usuario_actual
    )
    VALUES (
        @id_caso, 
        2, 
        @id_usuario_anterior,  
        @id_usuario_actual
    );
END;


-- =========================================================================================================================

CREATE OR ALTER PROCEDURE sp_getCases
    @id_usuario INT = NULL
AS
BEGIN
	SELECT
		c.id_caso,
		c.titulo,
		c.descripcion,
		c.id_estado,
		e.nombre AS "estado",
		c.id_estado_proceso,
		ep.nombre AS "proceso",
		c.fecha_creacion,
		f.id_fiscalia,
		f.nombre as "fiscalia",
		u.id_usuario,
		u.nombres,
		u.apellidos,
		u.no_identificacion 
	FROM Casos c
	INNER JOIN Estados e ON c.id_estado = e.id_estado 
	INNER JOIN Estados_Proceso ep ON c.id_estado_proceso = ep.id_estado_proceso
	INNER JOIN Fiscalias f ON c.id_fiscalia = f.id_fiscalia 
	LEFT JOIN Asignaciones_Caso ac ON c.id_caso = ac.id_caso AND ac.id_estado = 1
	LEFT JOIN Usuarios u ON ac.id_usuario = u.id_usuario
	WHERE (@id_usuario IS NULL OR u.id_usuario = @id_usuario);
END;


-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_UsuarioActivo
    @id_usuario INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Devuelve 1 si el usuario existe y está activo, 0 si no
    SELECT 
        CASE 
            WHEN EXISTS (
                SELECT 1
                FROM Usuarios
                WHERE id_usuario = @id_usuario
                  AND id_estado = 1
            ) THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT)
        END AS activo;
END;

-- =========================================================================================================================
CREATE OR ALTER PROCEDURE sp_UsuarioActivo
    @id_usuario INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        CASE 
            WHEN EXISTS (
                SELECT 1
                FROM Usuarios
                WHERE id_usuario = @id_usuario
                  AND id_estado = 1
            ) 
            THEN CAST(1 AS BIT) 
            ELSE CAST(0 AS BIT) 
        END AS activo;
END;