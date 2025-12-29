-- Event Types table indexes
CREATE INDEX idx_event_types_user_id ON event_types(user_id);
CREATE INDEX idx_event_types_user_id_is_active ON event_types(user_id, is_active);

-- Availabilities table indexes
CREATE INDEX idx_availabilities_user_id ON availabilities(user_id);
CREATE INDEX idx_availabilities_user_id_day ON availabilities(user_id, day_of_week);

-- Contacts table indexes
CREATE INDEX idx_contacts_user_id ON contacts(user_id);
CREATE INDEX idx_contacts_phone ON contacts(phone);

-- Events table indexes
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_event_type_id ON events(event_type_id);
CREATE INDEX idx_events_contact_id ON events(contact_id);
CREATE INDEX idx_events_start_at ON events(start_at);
CREATE INDEX idx_events_user_id_status ON events(user_id, status);
