alter table declarations add column if not exists civil_id text;
alter table declarations add column if not exists screening text;

create index if not exists declarations_civil_idx on declarations (civil_id);
