const userUtil = require('../models/user.util');

const SUPPORTED_CLIENTS = [
  {
    id: 'designassistant-dev',
    redirect_uri: 'https://designassistant.dev.ai-global.org',
    name: 'AI Global Design Assistant (Dev Version)',
    allowedScopes: ['*'],
  },
  {
    id: 'designassistant',
    redirect_uri: 'https://designassistant.ai-global.org',
    name: 'AI Global Design Assistant',
    allowedScopes: ['*'],
  },
  {
    id: 'designassistant',
    redirect_uri: 'https://designassistant.responsible.ai',
    name: 'AI Global Design Assistant',
    allowedScopes: ['*'],
  },
  {
    id: 'localhost',
    redirect_uri: 'http://localhost:3000',
    name: 'Localhost',
    allowedScopes: ['*'],
  },
  {
    id: 'certificate-beta1',
    redirect_uri: 'https://rai-certification-beta-1.herokuapp.com/',
    name: 'AI Global Certification Beta 1',
    allowedScopes: ['*'],
  },
  {
    id: 'certificate-beta2',
    redirect_uri: 'https://rai-certification-beta-2.herokuapp.com/',
    name: 'AI Global Certification Beta 2',
    allowedScopes: ['*'],
  },
  {
    id: 'certificate-beta3',
    redirect_uri: 'https://rai-certification-beta-3.herokuapp.com/',
    name: 'AI Global Certification Beta 3',
    allowedScopes: ['*'],
  },
  {
    id: 'certificate-beta4',
    redirect_uri: 'https://rai-certification-beta-4.herokuapp.com/',
    name: 'AI Global Certification Beta 4',
    allowedScopes: ['*'],
  },
  {
    id: 'certificate-beta5',
    redirect_uri: 'https://rai-certification-beta-5.herokuapp.com/',
    name: 'AI Global Certification Beta 5',
    allowedScopes: ['*'],
  },
  {
    id: 'certificate-beta-dev',
    redirect_uri: 'https://rai-certification-beta-testing.herokuapp.com',
    name: 'AI Global Certification Beta (Dev Version)',
    allowedScopes: ['*'],
  },
];

module.exports = (app) => {
  const firewall = require('../lib/firewall')(app);

  firewall.get(
    '/api/oauth/clients/:cid',
    async (req, res) => {
      res.json(SUPPORTED_CLIENTS.find((c) => c.id == req.params.cid));
    },
    { public: ['cid'] }
  );

  firewall.post(
    '/api/oauth/authcode',
    async (req, res) => {
      let user = await req.getUser();
      let {
        client_id,
        code_challenge,
        code_challenge_method,
        redirect_uri,
        response_type,
        scope,
        state,
      } = req.body;
      let client = SUPPORTED_CLIENTS.find((c) => c.id == client_id);
      if (
        !client ||
        !redirect_uri.startsWith(client.redirect_uri) ||
        response_type != 'code' ||
        !user ||
        !client.allowedScopes.includes(scope)
      ) {
        return res.json({ errors: [{ msg: 'Bad oauth request' }] });
      }
      let authCode = req.jwtSign({
        userId: user._id,
        challenge: code_challenge,
        method: code_challenge_method,
      });
      res.json({
        authCode: authCode,
        redirect: `${redirect_uri}?state=${state}&code=${authCode}`,
      });
    },
    {
      user: [
        'client_id',
        'code_challenge',
        'code_challenge_method',
        'redirect_uri',
        'response_type',
        'scope',
        'state',
      ],
    }
  );

  firewall.post(
    '/api/oauth/token',
    async (req, res) => {
      let {
        grant_type,
        code,
        redirect_uri,
        client_id,
        code_verifier,
      } = req.body;
      let client = SUPPORTED_CLIENTS.find((c) => c.id == client_id);
      let decodedCode = req.jwtDecode(code);
      if (
        grant_type != 'authorization_code' ||
        !decodedCode.userId ||
        !code_verifier ||
        !client
      ) {
        res.json({});
      }
      let user = await userUtil.getById(decodedCode.userId);
      let token = req.jwtSign(userUtil.toTokenJSON(user, client.id));
      res.json({ accessToken: token });
    },
    {
      public: [
        'grant_type',
        'code',
        'redirect_uri',
        'client_id',
        'code_verifier',
      ],
    }
  );
};
