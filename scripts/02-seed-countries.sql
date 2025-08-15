-- Insert countries
INSERT INTO countries (name, code, flag_emoji) VALUES
('United Kingdom', 'uk', '🇬🇧'),
('United States', 'us', '🇺🇸'),
('Canada', 'ca', '🇨🇦'),
('Australia', 'au', '🇦🇺'),
('Germany', 'de', '🇩🇪'),
('Netherlands', 'nl', '🇳🇱'),
('Sweden', 'se', '🇸🇪'),
('Norway', 'no', '🇳🇴'),
('Denmark', 'dk', '🇩🇰'),
('France', 'fr', '🇫🇷'),
('Switzerland', 'ch', '🇨🇭'),
('Belgium', 'be', '🇧🇪'),
('Austria', 'at', '🇦🇹'),
('Finland', 'fi', '🇫🇮'),
('New Zealand', 'nz', '🇳🇿'),
('Japan', 'jp', '🇯🇵'),
('South Korea', 'kr', '🇰🇷'),
('Singapore', 'sg', '🇸🇬'),
('India', 'in', '🇮🇳'),
('China', 'cn', '🇨🇳')
ON CONFLICT (code) DO NOTHING;
