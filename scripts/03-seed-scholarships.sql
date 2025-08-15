-- Generate random scholarship IDs and insert initial scholarships
INSERT INTO scholarships (id, name, description, country_id, funding_type, education_level, application_deadline, requirements, benefits, application_fee) VALUES
(
  '2847593',
  'Chevening Scholarship',
  'The UK government''s global scholarship programme, funded by the Foreign and Commonwealth Office (FCO) and partner organisations.',
  (SELECT id FROM countries WHERE code = 'uk'),
  'fully_funded',
  ARRAY['postgraduate'],
  '2025-11-02',
  'Bachelor''s degree, 2+ years work experience, English proficiency, leadership potential',
  'Full tuition fees, monthly stipend, travel costs, visa application, arrival allowance',
  50.00
),
(
  '9384756',
  'Commonwealth Scholarship',
  'Scholarships for citizens of Commonwealth countries to study in the UK, funded by the UK Department for International Development.',
  (SELECT id FROM countries WHERE code = 'uk'),
  'fully_funded',
  ARRAY['postgraduate', 'phd'],
  '2025-12-15',
  'First-class or upper second-class honours degree, commitment to development, English proficiency',
  'Full tuition fees, living allowance, return airfare, thesis grant',
  0.00
),
(
  '5729384',
  'Erasmus Mundus Scholarship',
  'Joint Master''s and Doctoral programmes supported by the European Union, offering study opportunities across multiple European countries.',
  (SELECT id FROM countries WHERE code = 'de'),
  'fully_funded',
  ARRAY['postgraduate'],
  '2025-01-15',
  'Bachelor''s degree, English proficiency, academic excellence',
  'Full tuition fees, monthly allowance, travel and installation costs, insurance',
  75.00
),
(
  '1847293',
  'Fulbright Foreign Student Program',
  'Provides grants for graduate students, young professionals and artists from abroad to study and conduct research in the United States.',
  (SELECT id FROM countries WHERE code = 'us'),
  'fully_funded',
  ARRAY['postgraduate'],
  '2025-10-15',
  'Bachelor''s degree, English proficiency, leadership potential, academic excellence',
  'Full tuition, living stipend, health insurance, travel allowance',
  100.00
),
(
  '6384729',
  'Australia Awards Scholarship',
  'Long-term development scholarships contributing to the development needs of Australia''s partner countries.',
  (SELECT id FROM countries WHERE code = 'au'),
  'fully_funded',
  ARRAY['undergraduate', 'postgraduate'],
  '2025-04-30',
  'Academic merit, leadership qualities, commitment to development',
  'Full tuition fees, return air travel, establishment allowance, living allowance',
  0.00
),
(
  '8472936',
  'Vanier Canada Graduate Scholarships',
  'Scholarships to attract and retain world-class doctoral students and to establish Canada as a global centre of excellence in research and higher learning.',
  (SELECT id FROM countries WHERE code = 'ca'),
  'fully_funded',
  ARRAY['phd'],
  '2025-11-01',
  'Academic excellence, research potential, leadership',
  'CAD $50,000 per year for 3 years, research support',
  0.00
),
(
  '3947582',
  'DAAD Scholarships',
  'German Academic Exchange Service scholarships for international students to study in Germany.',
  (SELECT id FROM countries WHERE code = 'de'),
  'partial',
  ARRAY['undergraduate', 'postgraduate'],
  '2025-03-31',
  'Academic excellence, German language proficiency (for some programs), motivation',
  'Monthly stipend, health insurance, travel allowance',
  25.00
),
(
  '7293847',
  'Swedish Institute Scholarships',
  'Scholarships for highly qualified international students to pursue Master''s studies in Sweden.',
  (SELECT id FROM countries WHERE code = 'se'),
  'fully_funded',
  ARRAY['postgraduate'],
  '2025-02-15',
  'Academic excellence, leadership experience, commitment to making a difference',
  'Full tuition fees, living allowance, travel grant, insurance',
  50.00
)
ON CONFLICT (id) DO NOTHING;
