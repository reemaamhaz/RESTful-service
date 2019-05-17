CREATE DEFINER=`root`@`localhost` PROCEDURE `add_editCustomer`(
IN _id INT,
IN _email varchar(255),
IN _first_name varchar(30),
IN _last_name varchar(50),
IN _ip varchar(15),
IN _latitude float(10,6),
IN _longitude float(10,6),
IN _created_at datetime,
IN _updated_at datetime
)
BEGIN
		IF _id = 0 THEN
			INSERT INTO customers(email, first_name, last_name, ip, latitude, longitude, created_at, updated_at)
			VALUES (_email, _first_name, _last_name, _ip, _latitude, _longitude, _created_at, _updated_at);
        
			SET _id = LAST_INSERT_ID();
        
        ELSE
			UPDATE Customer
            SET 
            email = _email, 
            first_name = _first_name,
            last_name = _last_name, 
            ip = _ip,
            latitude = _latitude,
            longitude = _longitude,
            created_at = _created_at, 
            updated_at = _updated_at
            WHERE id = _id;
		END IF;
        
        SELECT _id AS 'id';
        
END
