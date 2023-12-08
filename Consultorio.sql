PGDMP     -    4                {            Consultorio    15.2    15.2 &    *           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            +           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ,           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            -           1262    16804    Consultorio    DATABASE     �   CREATE DATABASE "Consultorio" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Venezuela.1252';
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
    id_tipo_estudio integer,
    url_notas_estudio character varying(256),
    nombre_documento character varying(128)
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
    url_documento_historia character varying(256),
    nombre_documento character varying(128)
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
            public          postgres    false    223            �            1259    33302    usuarios    TABLE     }   CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(50),
    pass character varying(128)
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    33301    usuarios_id_seq    SEQUENCE     �   ALTER TABLE public.usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            !          0    16826    citas 
   TABLE DATA           A   COPY public.citas (id_cita, id_paciente, fecha_cita) FROM stdin;
    public          postgres    false    219   Y+       #          0    16839    estudios 
   TABLE DATA           m   COPY public.estudios (id_estudio, id_cita, id_tipo_estudio, url_notas_estudio, nombre_documento) FROM stdin;
    public          postgres    false    221   ,                 0    16817 	   historias 
   TABLE DATA           g   COPY public.historias (id_historia, id_paciente, url_documento_historia, nombre_documento) FROM stdin;
    public          postgres    false    217   4.                 0    16805 	   pacientes 
   TABLE DATA           x   COPY public.pacientes (id_paciente, nombre_paciente, apellido_paciente, cedula_paciente, telefono_paciente) FROM stdin;
    public          postgres    false    214   �/       %          0    16850    tipos_estudio 
   TABLE DATA           E   COPY public.tipos_estudio (id_tipo_estudio, nombre_tipo) FROM stdin;
    public          postgres    false    223   
1       '          0    33302    usuarios 
   TABLE DATA           4   COPY public.usuarios (id, nombre, pass) FROM stdin;
    public          postgres    false    225   <1       .           0    0    citas_id_cita_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.citas_id_cita_seq', 92, true);
          public          postgres    false    218            /           0    0    estudios_id_estudio_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.estudios_id_estudio_seq', 54, true);
          public          postgres    false    220            0           0    0    historias_id_historia_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.historias_id_historia_seq', 29, true);
          public          postgres    false    216            1           0    0    pacientes_id_paciente_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.pacientes_id_paciente_seq', 32, true);
          public          postgres    false    215            2           0    0     tipo_estudio_id_tipo_estudio_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.tipo_estudio_id_tipo_estudio_seq', 2, true);
          public          postgres    false    222            3           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 7, true);
          public          postgres    false    224            �           2606    16830    citas citas_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_pkey PRIMARY KEY (id_cita);
 :   ALTER TABLE ONLY public.citas DROP CONSTRAINT citas_pkey;
       public            postgres    false    219            �           2606    16843    estudios estudios_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.estudios
    ADD CONSTRAINT estudios_pkey PRIMARY KEY (id_estudio);
 @   ALTER TABLE ONLY public.estudios DROP CONSTRAINT estudios_pkey;
       public            postgres    false    221            �           2606    16837    historias historias_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.historias
    ADD CONSTRAINT historias_pkey PRIMARY KEY (id_historia);
 B   ALTER TABLE ONLY public.historias DROP CONSTRAINT historias_pkey;
       public            postgres    false    217            �           2606    33306    usuarios id 
   CONSTRAINT     I   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT id PRIMARY KEY (id);
 5   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT id;
       public            postgres    false    225                       2606    16815    pacientes pacientes_pkey 
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
       public          postgres    false    219    221    3203            �           2606    16820    historias id_paciente    FK CONSTRAINT     �   ALTER TABLE ONLY public.historias
    ADD CONSTRAINT id_paciente FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id_paciente);
 ?   ALTER TABLE ONLY public.historias DROP CONSTRAINT id_paciente;
       public          postgres    false    217    214    3199            �           2606    16831    citas id_paciente    FK CONSTRAINT     �   ALTER TABLE ONLY public.citas
    ADD CONSTRAINT id_paciente FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id_paciente);
 ;   ALTER TABLE ONLY public.citas DROP CONSTRAINT id_paciente;
       public          postgres    false    219    3199    214            �           2606    16855    estudios tipo_estudio    FK CONSTRAINT     �   ALTER TABLE ONLY public.estudios
    ADD CONSTRAINT tipo_estudio FOREIGN KEY (id_tipo_estudio) REFERENCES public.tipos_estudio(id_tipo_estudio) NOT VALID;
 ?   ALTER TABLE ONLY public.estudios DROP CONSTRAINT tipo_estudio;
       public          postgres    false    221    3207    223            !   �   x�]���0E�5�� ��%��gc��<W��e��Ll]��8����:�l=���^�v����B>�`/�;8�	.��?�aW����u����0��*��1�Hp�{:��k�T������M9�� �ý�6g�p	�H��k��6�p��#�s�v�q�;��z������a�<���      #     x����n�0��仐�6\r�e+h���c ��7�$X2�k������N�C;F	�����3�$O�}��n�h��C7�w^x��}�H��E�?��܌�Sd6�<��J��Kh��J	)���h#����~�������{;��!"��7�#�O_�K	��Ϗ�3��L.Uj��.(�LґE>Tj�5��5=Rc1�|�e�ln��X+Y� �X�̊���JbF���+%Xn�cƛ�eK!�J�2
����"��OM�2��l�f�&�E���{�k��_���! �s&������-�PD�8��dPI���3
Λ+���k�(=s8���p�Y{��T��j��V;$	���mϼ?��ҠS.�F�=V���MA��I�v��i�{�M�E�U׍�x�=?�-ȟT;��$AHP&8Y�����ύLr���H�:K�T�G�il��]z!;�b1������Q�a���o��:u�f۔�?N�X~ߦ�k^���f��>qJ�/�,m         `  x���_K�0����n��n7�}��D8��ĭ��n)m����y��B i����T���?+KG:C1�m�mU����1Q���l7�4,6��X�[����bkh�b�Vb#�"M�,$�UVz�GC�w�D"�����`м���c���� �Y�
AOI��49�^��!Ш.�H���
uN��T��li������N�1�9O��]�eB���	C�'J1�E4�C��8�b0ś���zȎdbb�U��`�;���d+Yɺ��E&�pQ��J]���'���p���iE�L&W �>K�1�Ӡtx|>q~��l@���uX�Zro<|;1�B�G9�4{ލ=|Z�3�^�n]u         V  x�mP�n�0=?~E~�g�DAa4h�\sa,"��m���#�Yx�ͼ��%�	?�UJ�9�&��,`��)�?e�u��S��Q�	^�:j���e�����QE砞u�|���m�e�����(X�%|@�}ٕ󒧄F�Q3�*F�ඦy7p7�0$(��jDɳm�!M��_�}���6X��&Y�۲�qS2D|�J�pw��
���i,hW{���?R=忸����!��$E�a�VH�</�c1�p�jª�a>��~�$�_�r(p v�ؤ:��y�iȠ�ߌZc���)Y?�~��#GO&�&����u�Yї�V𩎟�K�wO����9�����      %   "   x�3�t�K�/N�/�L�2�t���σqc���� ��
       '     x�]�ͺr@  �5����0ҒQ�	��|�aH'�8����[�x�*�h����@��(�:k�Fϐ�B{�a�����5��t6� S�sN�/<FE �@ ?Jl�n&�����[Z�J�bDB	6��U/q�pb�5?C���!5DM`���棬^�^��cvr�N�i�x�h�R�4�9��6=F�|n���Q�0�?�^?:��:o[�OZ�q�����&��s�&�j�&$B�ʆ����1U16�k\����P�+����c���7�O}h]��Ob�l��ъ��_f_o�&���5�x�d5�۠F�����R�m&ܧO{��	���B�W��e'_�6�c�:TXY@�vY�|�w�v>�G�P�M5�I�(��ҘD     