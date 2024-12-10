// src/config/swagger.js
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'User Management API',
      version: '1.0.0',
      description: 'API documentation for the user feature',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      '/users/register': {
        post: {
          tags: ['Users'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'example@example.com' },
                    password: { type: 'string', example: 'password123' },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Registration is successful',
            },
            400: {
              description: 'User already exists',
            },
            500: {
              description: 'Server error',
            },
          },
        },
      },
      '/users/login': {
        post: {
          tags: ['Users'],
          summary: 'Login an existing user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'example@example.com' },
                    password: { type: 'string', example: 'password123' },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '648dfh93jd84' },
                      email: { type: 'string', example: 'example@example.com' },
                      token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' },
                    },
                  },
                },
              },
            },
            401: {
              description: 'Invalid email or password',
            },
            500: {
              description: 'Server error',
            },
          },
        },
      },
    },
  };
  
  export default swaggerDefinition;
  