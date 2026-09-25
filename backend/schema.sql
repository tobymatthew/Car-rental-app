
CREATE TABLE dclr_cargenie_users(
                    d_id INTEGER PRIMARY KEY AUTO_INCREMENT,
                    d_user_id VARCHAR(500) NOT NULL,
                    d_first_name VARCHAR(500) NOT NULL,
                    d_last_name VARCHAR(500) NOT NULL,
                    d_password VARCHAR(500) NOT NULL,
                    d_email VARCHAR(500) UNIQUE NOT NULL,
                    d_phone_number VARCHAR(500) DEFAULT NULL,
                    d_profile_photo MEDIUMTEXT DEFAULT NULL,
                    d_drivers_license_number INTEGER DEFAULT NULL,
                    d_drivers_license_image VARCHAR DEFAULT NULL,
                    d_is_user_host BOOLEAN DEFAULT FALSE,
                    d_is_license_verified BOOLEAN DEFAULT FALSE,
                    d_is_admin BOOLEAN DEFAULT FALSE,
                    d_date_created TIMESTAMP NOT NULL DEFAULT NOW(),
                    d_email_verified TINYINT(1) NOT NULL
                    d_nin INT(12) NOT NULL AFTER,
                    d_nin_verified BOOLEAN DEFAULT FALSE,
                    d_bvn INT(12) NOT NULL AFTER,
                    b_bvn_verified BOOLEAN DEFAULT FALSE,

                    d_account_suspended TINYINT(1),
                    --
                    d_account_deleted TINYINT(1),
                    --
                    d_last_signed_in TIMESTAMP DEFAULT NOW();
                );





CREATE TABLE dclr_cargenie_host_vehicle(
                            d_id INTEGER PRIMARY KEY AUTO_INCREMENT,
                            d_vehicle_id VARCHAR(500) UNIQUE NOT NULL,
                            d_user_id VARCHAR(500) NOT NULL,
                            d_vehicle_make VARCHAR(500) NOT NULL,
                            d_vehicle_type VARCHAR(500) NOT NULL,
                            d_number_of_seats INTEGER NOT NULL,
                            d_year_of_make INTEGER NOT NULL,
                            d_colour VARCHAR(500) NOT NULL,
                              d_transmission VARCHAR(500) NOT NULL,
                              d_odometer VARCHAR(500) NOT NULL,
                              d_is_bluetooth BOOLEAN,
                              d_is_wheel_chair BOOLEAN,
                              d_is_gps BOOLEAN,
                              d_is_usb BOOLEAN,
                              d_is_heated BOOLEAN,
                              d_is_bike BOOLEAN,
                              d_is_child BOOLEAN,
                              d_is_keyless BOOLEAN,
                              d_is_back_camera BOOLEAN,
                              d_is_navigation BOOLEAN,
                            d_price VARCHAR(200),
                            d_pickup_location VARCHAR(520),
                            d_dropoff_location VARCHAR(520),
                              d_proof_of_own_number BIGINT,
                              d_proof_0f_own_photo VARCHAR,
                              d_vehicle_registration VARCHAR,
                              d_certificate_of_road VARCHAR,
                              d_insurance VARCHAR,
                              d_front_view_image VARCHAR,
                            d_back_view_image VARCHAR,
                            d_right_side_image VARCHAR,
                              d_left_side_image VARCHAR,
                            d_dashboard_view_image VARCHAR,
                            d_front_seat_image VARCHAR,
                            d_back_seat_image VARCHAR,
                            d_trunk_view_image VARCHAR,
                            d_approved_for_listing BOOLEAN DEFAULT FALSE,
                             d_deleted BOOLEAN DEFAULT FALSE,
                            d_date_created TIMESTAMP NOT NULL DEFAULT NOW();
                        );




CREATE TABLE dclr_cargenie_rating(
                        d_id INTEGER PRIMARY KEY AUTO_INCREMENT,
                        d_user_id VARCHAR(500) NOT NULL,
                        d_vehicle_id VARCHAR(500) NOT NULL,
                        d_comment VARCHAR(500),
                        d_rating FLOAT NOT NULL;
                        );

CREATE TABLE dclr_cargenie_otp(
                        d_id INTEGER PRIMARY KEY AUTO_INCREMENT,
                        d_user_id VARCHAR(100) NOT NULL,
                        d_otp_pass VARCHAR(100),
                        d_otp_timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
                        d_otp_tries tinyint(1);
                        );

CREATE TABLE dclr_cargenie_trips(
                        d_id INTEGER PRIMARY KEY AUTO_INCREMENT,
                        d_user_id VARCHAR(520) NOT NULL,
                        d_vehicle_id VARCHAR(520) NOT NULL,
                        d_trip_id VARCHAR(520) NOT NULL,
                        d_vehicle_price VARCHAR(200),
                        d_total_fee VARCHAR(200),
                        d_pickup_location VARCHAR(520),
                        d_dropoff_location VARCHAR(520),
                        d_date_pickup date,
                        d_date_dropoff date,
                        d_is_paid tinyint(1),
                        d_status  VARCHAR(520),
                        d_completed tinyint(1),
                        d_duration VARCHAR(200),
                        );

CREATE TABLE dclr_cargenie_log(
                        d_id INTEGER PRIMARY KEY AUTO_INCREMENT,
                        d_user_id VARCHAR(520) NOT NULL,
                        d_signin_date date,
                        d_signout_date date,
                        d_timein time,
                        d_timeout time;
                        );


CREATE TABLE dclr_cargenie_users_acc(
                        d_id INTEGER PRIMARY KEY AUTO_INCREMENT,
                        d_user_id VARCHAR(200) NOT NULL,
                        d_user_acc_no VARCHAR(10),
                        d_user_acc_name VARCHAR(250),
                        d_users_bank VARCHAR(225);
                        );

CREATE TABLE dclr_cargenie_request (
                        d_id int(200) NOT NULL,
                        d_user_id varchar(520) NOT NULL,
                        d_vehicle_id varchar(520) NOT NULL,
                        d_request_status int(3) NOT NULL
                    );

CREATE TABLE dclr_cargenie_notifications (
                        d_id int(200) NOT NULL,
                        d_user_id varchar(520) NOT NULL,
                        d_notification_id VARCHAR(200) NOT NULL,
                        d_trip_id varchar(520) NOT NULL,
                        d_type varchar(200) NOT NULL,
                        d_message mediumtext NOT NULL,
                        d_status varchar(200) NOT NULL,
                        d_date TIMESTAMP NOT NULL DEFAULT NOW()
                    );

-- DROP TABLE dclr_cargenie_user
-- DROP TABLE dclr_cargenie_users
-- DROP TABLE dclr_cargenie_host_vehicle
