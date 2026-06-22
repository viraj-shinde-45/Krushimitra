
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT contact_messages_email_len CHECK (char_length(email) BETWEEN 3 AND 320),
  ADD CONSTRAINT contact_messages_message_len CHECK (char_length(message) BETWEEN 1 AND 4000);

DROP POLICY "Anyone can submit contact message" ON public.contact_messages;
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 320
    AND char_length(message) BETWEEN 1 AND 4000
  );
