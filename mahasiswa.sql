CREATE TABLE public.users
(
id serial NOT NULL ,
nama character varying(100) NOT NULL,
username character varying(50) NOT NULL,
email character varying(100) NOT NULL,
telp character varying(15) NOT NULL,
password character varying(255) NOT NULL,
created_at timestamp without time zone NOT NULL DEFAULT now(),
updated_at timestamp without time zone,
CONSTRAINT users_pkey PRIMARY KEY (id)
)