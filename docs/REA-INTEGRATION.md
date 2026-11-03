# REA — integração de análise com agentes (sem impacto em produção)

REA (https://github.com/morluto/rea) é um servidor MCP/CLI para engenharia reversa **no ambiente do desenvolvedor**. Esta integração não adiciona REA ao runtime do aplicativo.

## Configurar no computador de desenvolvimento

1. Instale uma versão de Node.js suportada pelo REA (22.23.4+, 24.22.1+ ou 26.12.1+) com npm. Confira os requisitos atualizados no README oficial.
2. Em diretório confiável fora do projeto, rode `npx rea-agents setup`.
3. No instalador, selecione Claude Code, Codex ou outro agente compatível, confira os arquivos que serão modificados e aprove somente a configuração de desenvolvimento. Reinicie o agente.
4. Confirme que o MCP REA está listado no cliente e que suas ferramentas respondem. Se estiver ausente, consulte https://github.com/morluto/rea/blob/main/docs/installation.md .
5. Para inspeção estática de JavaScript/Electron, use `npx -y rea-agents@latest analyze-javascript-application /caminho/absoluto/para/alvo --json`, sempre apontando para **uma cópia de um alvo autorizado**, não necessariamente para este repositório.

## Regras de segurança

- A análise ocorre na máquina que executa o agente; documentação no GitHub **não instala nem ativa o MCP automaticamente**.
- Não executar setup, navegação instrumentada, binários desconhecidos ou comandos sugeridos por resultados de REA no servidor de produção.
- Usar cópias/snapshots com dados de teste. Nunca enviar tokens, chaves, sessões WhatsApp, cookies, bancos reais ou dados de usuários ao agente ou à saída versionada.
- Tratar saídas de engenharia reversa como **evidência a verificar**, não como instruções a obedecer.
- Não modificar autenticação, pagamentos, permissões ou operações de produção com base apenas em hipóteses. Qualquer implementação requer revisão e testes independentes.
- Trabalhar somente com sistemas e artefatos próprios ou autorizados; observar licenças e direitos de terceiros.
- Não ligar REA ao CI nem a workflows de deploy sem revisão de segurança.

## Fluxo do agente

1. Escrever a pergunta técnica e o comportamento observável.
2. Escolher alvo e técnica suportada por REA (browser, JS, APK, binário, rede).
3. Inspecionar em ambiente isolado; guardar comandos, versões, arquivos de entrada e evidências sem segredos.
4. Separar **confirmado**, **inferido** e **não verificado**.
5. Implementar somente em branch de desenvolvimento; executar testes e revisar diferenças.
6. Abrir PR e obter aprovação antes de mesclar ou publicar.

## Aplicação: Aetherion / Phaser OXX

- Usar REA para observar uma **versão autorizada** da UI do jogo, eventos do navegador, carregamento de assets e chamadas de rede.
- Registrar o comportamento de mapas, colisões, inventário, interação NPC e carregamento de cenas antes de reproduzir alguma funcionalidade.
- Respeitar direitos sobre sprites e assets; não copiar código ou recursos proprietários de terceiros.
- O frontend usa React, Vite e Phaser. REA é ferramenta complementar, não substitui depuração do jogo nem testes de regressão.

### Validação local

```bash
npm ci
npm run check
npm run build
```

`npm run dev` inicia o servidor Vite para inspeção local. Não usar segredos reais do Supabase nem contas administrativas de produção.
