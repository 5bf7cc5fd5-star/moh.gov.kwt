-- Traveller health declarations (public submissions; no user_id).
create table if not exists declarations (
  id text primary key,
  code text not null unique,
  direction text not null,
  port text not null,
  travel_date text not null,
  purpose text not null,
  medical_condition text,
  medical_emergency boolean,
  days_in_uganda text,
  coming_from text,
  countries_visited text,
  flight_number text not null,
  address_in_uganda text,
  destination_country text,
  full_name text not null,
  age integer not null,
  sex text not null,
  citizenship text not null,
  passport_number text not null,
  phone_country text not null,
  phone_number text not null,
  email text,
  has_symptoms boolean not null,
  symptoms_detail text,
  contact_sick boolean not null,
  attended_funeral boolean not null,
  visited_hospital boolean not null,
  handled_animals boolean not null,
  risk_flag boolean not null,
  locale text not null default 'en',
  created_at timestamptz not null default now()
);

create unique index if not exists declarations_code_idx on declarations (code);
create index if not exists declarations_passport_idx on declarations (passport_number);
create index if not exists declarations_created_idx on declarations (created_at desc);
