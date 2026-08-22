-- Member wallets (from traveller declarations) and credit ledger.
create table if not exists members (
  id text primary key,
  full_name text not null,
  email text,
  phone text,
  civil_id text,
  passport_number text,
  balance numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists members_civil_uidx
  on members (civil_id) where civil_id is not null and civil_id <> '';
create unique index if not exists members_passport_uidx
  on members (passport_number) where passport_number is not null and passport_number <> '';
create index if not exists members_email_idx on members (email);
create index if not exists members_phone_idx on members (phone);

create table if not exists credit_ledger (
  id text primary key,
  member_id text not null,
  amount numeric not null,
  note text,
  batch_id text,
  kind text not null default 'single',
  created_at timestamptz not null default now()
);

create index if not exists credit_ledger_member_idx on credit_ledger (member_id, created_at desc);
create index if not exists credit_ledger_created_idx on credit_ledger (created_at desc);
