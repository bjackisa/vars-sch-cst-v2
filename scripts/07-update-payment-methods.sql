-- Allow VISA and manual payments in applications.payment_method
ALTER TABLE applications
  DROP CONSTRAINT IF EXISTS applications_payment_method_check;

ALTER TABLE applications
  ADD CONSTRAINT applications_payment_method_check
  CHECK (payment_method IN ('stripe', 'mtn_momo', 'airtel_pay', 'visa', 'manual'));

