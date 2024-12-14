import dotenv from 'dotenv';
dotenv.config();
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'User Management API',
      version: '1.0.0',
      description: 'API documentation for the user feature',
    },
    servers: [
      {
        url:`https://busy-buy-api.vercel.app/api`,
        description: 'MY API DOCUMENTATION',
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
    paths:{
        "/users/register": {
          "post": {
            "tags": ["Users"],
            "summary": "Register a new user",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": { "type": "string", "example": "example@example.com" },
                      "password": { "type": "string", "example": "password123" }
                    },
                    "required": ["email", "password"]
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Registration is successful"
              },
              "400": {
                "description": "User already exists"
              },
              "500": {
                "description": "Server error"
              }
            }
          }
        },
        "/users/login": {
          "post": {
            "tags": ["Users"],
            "summary": "Login an existing user",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": { "type": "string", "example": "example@example.com" },
                      "password": { "type": "string", "example": "password123" }
                    },
                    "required": ["email", "password"]
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Login successful",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "id": { "type": "string", "example": "648dfh93jd84" },
                        "email": { "type": "string", "example": "example@example.com" },
                        "token": { "type": "string", "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6..." }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Invalid email or password"
              },
              "500": {
                "description": "Server error"
              }
            }
          }
        },
        "/cart/": {
          "get": {
            "summary": "Get all cart items for a specific user",
            "description": "Retrieve all cart items associated with a specific user. Requires a valid JWT token.",
            "tags": ["Cart"],
            "parameters": [
              {
                "name": "Authorization",
                "in": "header",
                "required": true,
                "description": "Bearer token for authentication",
                "schema": {
                  "type": "string",
                  "example": "Bearer <your-jwt-token>"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "List of cart items retrieved successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "cartItems": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "_id": { "type": "string" },
                              "user": {
                                "type": "object",
                                "properties": {
                                  "_id": { "type": "string" },
                                  "email": { "type": "string" }
                                }
                              },
                              "productDetails": { "type": "object" },
                              "itemQuantity": { "type": "number" }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Not authorized, invalid or missing token"
              },
              "404": {
                "description": "No items found in the cart"
              },
              "500": {
                "description": "Server error"
              }
            }
          }
        },
        "/cart/add": {
          "post": {
            "summary": "Add a product to the cart",
            "description": "Add a product to a user's cart. Requires a valid JWT token.",
            "tags": ["Cart"],
            "parameters": [
              {
                "name": "Authorization",
                "in": "header",
                "required": true,
                "description": "Bearer token for authentication",
                "schema": {
                  "type": "string",
                  "example": "Bearer <your-jwt-token>"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "productDetails": { "type": "object" },
                      "itemQuantity": { "type": "number", "example": 2 }
                    }
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Item added to cart successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": { "type": "string" },
                        "cart": { "type": "object" }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Not authorized, invalid or missing token"
              },
              "500": {
                "description": "Server error"
              }
            }
          }
        },
        "/cart/reduce": {
          "post": {
            "summary": "Reduce cart quantity by one",
            "description": "Reduce the quantity of a specific cart item by one. Requires a valid JWT token.",
            "tags": ["Cart"],
            "parameters": [
              {
                "name": "Authorization",
                "in": "header",
                "required": true,
                "description": "Bearer token for authentication",
                "schema": {
                  "type": "string",
                  "example": "Bearer <your-jwt-token>"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "productId": { "type": "string", "example": "12345" }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Cart quantity reduced successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": { "type": "string" },
                        "cart": { "type": "object" }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Not authorized, invalid or missing token"
              },
              "404": {
                "description": "Item not found in the cart"
              },
              "500": {
                "description": "Server error"
              }
            }
          }
        },
        "/cart/remove": {
          "post": {
            "summary": "Remove an item from the cart",
            "description": "Remove a specific item from the user's cart. Requires a valid JWT token.",
            "tags": ["Cart"],
            "parameters": [
              {
                "name": "Authorization",
                "in": "header",
                "required": true,
                "description": "Bearer token for authentication",
                "schema": {
                  "type": "string",
                  "example": "Bearer <your-jwt-token>"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "productId": { "type": "string", "example": "12345" }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Item removed from cart successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": { "type": "string" }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Not authorized, invalid or missing token"
              },
              "404": {
                "description": "Item not found in the cart"
              },
              "500": {
                "description": "Server error"
              }
            }
          }
        },
        "/orders/create": {
          "post": {
            "summary": "Create a new order",
            "tags": ["Orders"],
            "security": [
              { "bearerAuth": [] }
            ],
            
            "responses": {
              "201": {
                "description": "Order created successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": { "type": "string", "example": "Order placed successfully." },
                        "order": { "type": "object" }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad request"
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Cart not found or empty"
              },
              "500": {
                "description": "Server error"
              }
            }
          }
        },
        "/orders/": {
          "get": {
            "summary": "Get all orders by user",
            "tags": ["Orders"],
            "parameters": [
             
            ],
            "responses": {
              "200": {
                "description": "Orders retrieved successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "orders": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "orderCreatedAt": { "type": "string", "example": "2024-12-10T10:00:00Z" },
                              "items": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "quantity": { "type": "number", "example": 2 },
                                    "productAmount": { "type": "number", "example": 150 },
                                    "totalAmount": { "type": "number", "example": 300 },
                                    "productName": { "type": "string", "example": "Product 1" }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "No orders found"
              },
              "500": {
                "description": "Server error"
              }
            }
          }
        }
      }
      ,
  };
  
  export default swaggerDefinition;
  