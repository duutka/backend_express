--Create plant table

create table plant
(
    id      bigserial not null
        constraint plant_pk
            primary key,
    name_en varchar,
    name_ru varchar   not null
);

comment on table plant is 'Растение';

comment on column plant.name_en is 'Название на английском';

comment on column plant.name_ru is 'Название на русском';

alter table plant
    owner to postgres;

create unique index plant_id_uindex
    on plant (id);

INSERT INTO public.plant (id, name_en, name_ru) VALUES (2, 'Dandelion', 'Одуванчик');

--Create plant_part table

create table plant_part
(
    id      bigserial not null
        constraint plant_part_pk
            primary key,
    name_en varchar,
    name_ru varchar   not null
);

comment on table plant_part is 'Орган растения';

comment on column plant_part.name_en is 'Название на английском';

comment on column plant_part.name_ru is 'Название на русском';

alter table plant_part
    owner to postgres;

create unique index plant_part_id_uindex
    on plant_part (id);

INSERT INTO public.plant_part (id, name_en, name_ru) VALUES (1, 'Leafs', 'Листья');

--Create disease table

create table disease
(
    id      bigserial not null
        constraint disease_pk
            primary key,
    name_en varchar,
    name_ru varchar   not null
);

comment on table disease is 'Болезнь';

comment on column disease.name_en is 'Название на английском';

comment on column disease.name_ru is 'Название на русском';

alter table disease
    owner to postgres;

create unique index disease_id_uindex
    on disease (id);

INSERT INTO public.disease (id, name_en, name_ru) VALUES (1, 'Ulcer', 'Язва');

--Create scan table

create table scan
(
    id            bigserial                                          not null
        constraint scan_pk
            primary key,
    plant_id      bigint                                             not null
        constraint scan_plant_id_fk
            references plant
            on update cascade on delete cascade,
    disease_id    bigint                                             not null
        constraint scan_disease_id_fk
            references disease
            on update cascade on delete cascade,
    plant_part_id bigint                                             not null
        constraint scan_plant_part_id_fk
            references plant_part
            on update cascade on delete cascade,
    image_name    varchar                                            not null,
    upload_date   timestamp with time zone default CURRENT_TIMESTAMP not null
);

comment on table scan is 'Отсканированное изображение';

comment on column scan.plant_id is 'ID растения';

comment on column scan.disease_id is 'ID болезни';

comment on column scan.image_name is 'Название изображения';

comment on column scan.upload_date is 'Время загрузки';

alter table scan
    owner to postgres;

create unique index scan_id_uindex
    on scan (id);

INSERT INTO public.scan (id, plant_id, disease_id, plant_part_id, image_name, upload_date) VALUES (3, 2, 1, 1, 'some-name.png', '2021-05-29 16:21:24.283708');
INSERT INTO public.scan (id, plant_id, disease_id, plant_part_id, image_name, upload_date) VALUES (4, 2, 1, 1, 'some-name-2.png', '2021-05-29 16:38:26.029903');

--Create scan_vw view

create view scan_vw
            (id, image_name, upload_date, plant_id, plant_name_en, plant_name_ru, disease_id, disease_name_en,
             disease_name_ru, plant_part_id, plant_part_name_en, plant_part_name_ru)
as
SELECT scan.id,
       scan.image_name,
       scan.upload_date,
       scan.plant_id,
       plant.name_en      AS plant_name_en,
       plant.name_ru      AS plant_name_ru,
       scan.disease_id,
       disease.name_en    AS disease_name_en,
       disease.name_ru    AS disease_name_ru,
       scan.plant_part_id,
       plant_part.name_en AS plant_part_name_en,
       plant_part.name_ru AS plant_part_name_ru
FROM scan,
     plant,
     disease,
     plant_part
WHERE plant.id = scan.plant_id
  AND disease.id = scan.disease_id
  AND plant_part.id = scan.plant_part_id;

comment on view scan_vw is 'Представление отсканированного изображения';

comment on column scan_vw.image_name is 'Название изображения';

comment on column scan_vw.upload_date is 'Время загрузки';

comment on column scan_vw.plant_id is 'ID растения';

comment on column scan_vw.disease_id is 'ID болезни';

alter table scan_vw
    owner to postgres;

INSERT INTO public.scan_vw (id, image_name, upload_date, plant_id, plant_name_en, plant_name_ru, disease_id, disease_name_en, disease_name_ru, plant_part_id, plant_part_name_en, plant_part_name_ru) VALUES (3, 'some-name.png', '2021-05-29 16:21:24.283708', 2, 'Dandelion', 'Одуванчик', 1, 'Ulcer', 'Язва', 1, 'Leafs', 'Листья');
INSERT INTO public.scan_vw (id, image_name, upload_date, plant_id, plant_name_en, plant_name_ru, disease_id, disease_name_en, disease_name_ru, plant_part_id, plant_part_name_en, plant_part_name_ru) VALUES (4, 'some-name-2.png', '2021-05-29 16:38:26.029903', 2, 'Dandelion', 'Одуванчик', 1, 'Ulcer', 'Язва', 1, 'Leafs', 'Листья');

--Create user table
create table "user"
(
    login      varchar not null
        constraint user_pk
            primary key,
    password   varchar not null,
    firstname  varchar,
    lastname varchar
);

comment on table "user" is 'Пользователь';

comment on column "user".login is 'Логин';

comment on column "user".password is 'Пароль';

comment on column "user".firstname is 'Имя';

comment on column "user".lastname is 'Фамилия';

alter table "user"
    owner to postgres;

create unique index user_login_uindex
    on "user" (login);

