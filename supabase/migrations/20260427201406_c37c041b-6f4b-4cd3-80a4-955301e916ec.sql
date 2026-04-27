
-- Tabela para conteúdo editável do site (regras, termos, privacidade)
CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Qualquer um pode ler (páginas públicas)
CREATE POLICY "Site content is viewable by everyone"
ON public.site_content
FOR SELECT
USING (true);

-- Apenas admins podem inserir
CREATE POLICY "Admins can insert site content"
ON public.site_content
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Apenas admins podem atualizar
CREATE POLICY "Admins can update site content"
ON public.site_content
FOR UPDATE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Conteúdo inicial
INSERT INTO public.site_content (key, title, content) VALUES
('rules', 'Regras do Sorteio', E'# Regras do Sorteio\n\nEdite este conteúdo no Painel Admin > Configurações.\n\n1. Cada bilhete adquirido dá direito a um número da sorte.\n2. O sorteio será realizado conforme data divulgada.\n3. O ganhador será contatado via WhatsApp informado no cadastro.'),
('terms', 'Termos de Uso', E'# Termos de Uso\n\n**Última atualização:** ' || to_char(now(), 'DD/MM/YYYY') || E'\n\n## 1. Aceitação dos Termos\n\nAo acessar e utilizar a plataforma Premia Sempre, você concorda integralmente com estes Termos de Uso. Caso não concorde, por favor não utilize nossos serviços.\n\n## 2. Descrição do Serviço\n\nA Premia Sempre é uma plataforma digital que oferece sorteios de produtos mediante a aquisição de bilhetes (números da sorte). Os sorteios são realizados de forma transparente e os ganhadores são divulgados publicamente.\n\n## 3. Cadastro e Responsabilidades do Usuário\n\n- O usuário deve fornecer informações verdadeiras, completas e atualizadas.\n- É de responsabilidade do usuário manter a confidencialidade de seus dados de acesso.\n- O usuário deve ser maior de 18 anos para participar dos sorteios.\n\n## 4. Pagamentos\n\nOs pagamentos são processados através de plataformas seguras (Mercado Pago). Após a confirmação do pagamento, os números da sorte são atribuídos automaticamente ao participante.\n\n## 5. Sorteios e Premiação\n\n- Os sorteios serão realizados na data e hora divulgadas previamente.\n- O ganhador será contatado pelo WhatsApp informado no cadastro.\n- O prêmio será entregue conforme as condições descritas em cada sorteio.\n\n## 6. Cancelamento e Reembolso\n\nApós a confirmação do pagamento e atribuição dos números, não há possibilidade de cancelamento ou reembolso, salvo nos casos previstos pela legislação vigente.\n\n## 7. Limitação de Responsabilidade\n\nA Premia Sempre não se responsabiliza por falhas técnicas, interrupções de serviço ou prejuízos decorrentes do uso indevido da plataforma.\n\n## 8. Alterações dos Termos\n\nReservamos o direito de alterar estes Termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.\n\n## 9. Contato\n\nDúvidas podem ser enviadas pelo WhatsApp disponibilizado no rodapé do site.'),
('privacy', 'Política de Privacidade', E'# Política de Privacidade\n\n**Última atualização:** ' || to_char(now(), 'DD/MM/YYYY') || E'\n\n## 1. Introdução\n\nA sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).\n\n## 2. Informações que Coletamos\n\n- **Dados de cadastro:** nome, e-mail, WhatsApp e CPF.\n- **Dados de pagamento:** processados por terceiros (Mercado Pago); não armazenamos dados de cartão.\n- **Dados de navegação:** endereço IP, tipo de navegador e páginas visitadas (cookies).\n\n## 3. Como Usamos Suas Informações\n\n- Processar a aquisição de bilhetes e atribuir números da sorte.\n- Comunicar sobre o sorteio, premiação e novidades.\n- Cumprir obrigações legais e regulatórias.\n- Melhorar a experiência de uso da plataforma.\n\n## 4. Compartilhamento de Dados\n\nNão vendemos seus dados. Podemos compartilhá-los apenas com:\n- Processadores de pagamento (Mercado Pago).\n- Autoridades competentes, quando exigido por lei.\n\n## 5. Cookies\n\nUtilizamos cookies para melhorar a navegação. Você pode desabilitá-los nas configurações do seu navegador, mas algumas funcionalidades poderão ser afetadas.\n\n## 6. Segurança\n\nAdotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou divulgação indevida.\n\n## 7. Seus Direitos (LGPD)\n\nVocê tem direito a:\n- Confirmar a existência de tratamento de seus dados.\n- Acessar, corrigir ou solicitar a exclusão dos seus dados.\n- Revogar consentimento a qualquer momento.\n- Solicitar portabilidade dos dados.\n\nPara exercer seus direitos, entre em contato pelo WhatsApp do rodapé.\n\n## 8. Retenção de Dados\n\nMantemos seus dados pelo tempo necessário para cumprir as finalidades descritas, ou conforme exigido por lei.\n\n## 9. Alterações\n\nEsta política pode ser atualizada periodicamente. A versão mais recente estará sempre disponível nesta página.\n\n## 10. Contato do Encarregado (DPO)\n\nDúvidas relativas à privacidade podem ser enviadas pelo WhatsApp disponível no rodapé do site.');

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.update_site_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_site_content_updated_at();
