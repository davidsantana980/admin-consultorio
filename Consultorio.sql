PGDMP     !                	    {            Consultorio    15.2    15.2 !    !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            $           1262    16804    Consultorio    DATABASE     �   CREATE DATABASE "Consultorio" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Venezuela.1252';
    DROP DATABASE "Consultorio";
                postgres    false            �            1259    16826    citas    TABLE     j   CREATE TABLE public.citas (
    id_cita integer NOT NULL,
    id_paciente integer,
    fecha_cita date
);
    DROP TABLE public.citas;
       public         heap    postgres    false            �            1259    16825    citas_id_cita_seq    SEQUENCE     �   ALTER TABLE public.citas ALTER COLUMN id_cita ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.citas_id_cita_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    16839    estudios    TABLE     �   CREATE TABLE public.estudios (
    id_estudio integer NOT NULL,
    id_cita integer,
    tipo_estudio integer,
    notas_estudio character varying(256)
);
    DROP TABLE public.estudios;
       public         heap    postgres    false            �            1259    16838    estudios_id_estudio_seq    SEQUENCE     �   ALTER TABLE public.estudios ALTER COLUMN id_estudio ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.estudios_id_estudio_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    16817 	   historias    TABLE     �   CREATE TABLE public.historias (
    id_historia integer NOT NULL,
    id_paciente integer,
    documento_historia character varying(256)
);
    DROP TABLE public.historias;
       public         heap    postgres    false            �            1259    16816    historias_id_historia_seq    SEQUENCE     �   ALTER TABLE public.historias ALTER COLUMN id_historia ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.historias_id_historia_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    16805 	   pacientes    TABLE     �   CREATE TABLE public.pacientes (
    id_paciente integer NOT NULL,
    nombre_paciente character varying(256),
    apellido_paciente character varying(256),
    cedula_paciente character varying(15),
    telefono_paciente character varying(20)
);
    DROP TABLE public.pacientes;
       public         heap    postgres    false            �            1259    16808    pacientes_id_paciente_seq    SEQUENCE     �   ALTER TABLE public.pacientes ALTER COLUMN id_paciente ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pacientes_id_paciente_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    16850    tipos_estudio    TABLE     t   CREATE TABLE public.tipos_estudio (
    id_tipo_estudio integer NOT NULL,
    nombre_tipo character varying(256)
);
 !   DROP TABLE public.tipos_estudio;
       public         heap    postgres    false            �            1259    16849     tipo_estudio_id_tipo_estudio_seq    SEQUENCE     �   ALTER TABLE public.tipos_estudio ALTER COLUMN id_tipo_estudio ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tipo_estudio_id_tipo_estudio_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223                      0    16826    citas 
   TABLE DATA           A   COPY public.citas (id_cita, id_paciente, fecha_cita) FROM stdin;
    public          postgres    false    219   �%                 0    16839    estudios 
   TABLE DATA           T   COPY public.estudios (id_estudio, id_cita, tipo_estudio, notas_estudio) FROM stdin;
    public          postgres    false    221   �%                 0    16817 	   historias 
   TABLE DATA           Q   COPY public.historias (id_historia, id_paciente, documento_historia) FROM stdin;
    public          postgres    false    217   �%                 0    16805 	   pacientes 
   TABLE DATA           x   COPY public.pacientes (id_paciente, nombre_paciente, apellido_paciente, cedula_paciente, telefono_paciente) FROM stdin;
    public          postgres    false    214   �%                 0    16850    tipos_estudio 
   TABLE DATA           E   COPY public.tipos_estudio (id_tipo_estudio, nombre_tipo) FROM stdin;
    public          postgres    false    223   &       %           0    0    citas_id_cita_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.citas_id_cita_seq', 1, false);
          public          postgres    false    218            &           0    0    estudios_id_estudio_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.estudios_id_estudio_seq', 1, false);
          public          postgres    false    220            '           0    0    historias_id_historia_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.historias_id_historia_seq', 1, false);
          public          postgres    false    216            (           0    0    pacientes_id_paciente_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.pacientes_id_paciente_seq', 1, false);
          public          postgres    false    215            )           0    0     tipo_estudio_id_tipo_estudio_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.tipo_estudio_id_tipo_estudio_seq', 1, false);
          public          postgres    false    222            ~           2606    16830    citas citas_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_pkey PRIMARY KEY (id_cita);
 :   ALTER TABLE ONLY public.citas DROP CONSTRAINT citas_pkey;
       public            postgres    false    219            �           2606    16843    estudios estudios_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.estudios
    ADD CONSTRAINT estudios_pkey PRIMARY KEY (id_estudio);
 @   ALTER TABLE ONLY public.estudios DROP CONSTRAINT estudios_pkey;
       public            postgres    false    221            |           2606    16837    historias historias_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.historias
    ADD CONSTRAINT historias_pkey PRIMARY KEY (id_historia);
 B   ALTER TABLE ONLY public.historias DROP CONSTRAINT historias_pkey;
       public            postgres    false    217            z           2606    16815    pacientes pacientes_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id_paciente);
 B   ALTER TABLE ONLY public.pacientes DROP CONSTRAINT pacientes_pkey;
       public            postgres    false    214            �           2606    16854    tipos_estudio tipo_estudio_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.tipos_estudio
    ADD CONSTRAINT tipo_estudio_pkey PRIMARY KEY (id_tipo_estudio);
 I   ALTER TABLE ONLY public.tipos_estudio DROP CONSTRAINT tipo_estudio_pkey;
       public            postgres    false    223            �           2606    16844    estudios id_cita    FK CONSTRAINT     t   ALTER TABLE ONLY public.estudios
    ADD CONSTRAINT id_cita FOREIGN KEY (id_cita) REFERENCES public.citas(id_cita);
 :   ALTER TABLE ONLY public.estudios DROP CONSTRAINT id_cita;
       public          postgres    false    3198    221    219            �           2606    16820    historias id_paciente    FK CONSTRAINT     �   ALTER TABLE ONLY public.historias
    ADD CONSTRAINT id_paciente FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id_paciente);
 ?   ALTER TABLE ONLY public.historias DROP CONSTRAINT id_paciente;
       public          postgres    false    217    214    3194            �           2606    16831    citas id_paciente    FK CONSTRAINT     �   ALTER TABLE ONLY public.citas
    ADD CONSTRAINT id_paciente FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id_paciente);
 ;   ALTER TABLE ONLY public.citas DROP CONSTRAINT id_paciente;
       public          postgres    false    3194    214    219            �           2606    16855    estudios tipo_estudio    FK CONSTRAINT     �   ALTER TABLE ONLY public.estudios
    ADD CONSTRAINT tipo_estudio FOREIGN KEY (tipo_estudio) REFERENCES public.tipos_estudio(id_tipo_estudio) NOT VALID;
 ?   ALTER TABLE ONLY public.estudios DROP CONSTRAINT tipo_estudio;
       public          postgres    false    221    223    3202                  x������ � �            x������ � �            x������ � �            x������ � �            x������ � �     