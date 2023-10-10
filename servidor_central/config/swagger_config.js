var rutas = {};

rutas['/token'] = {
    post: {
        summary: 'Generar JWT',
        description: 'El profesor realizará la asignación de tu usuario y contraseña. El token debe enviarse en los headers bajo la estructura "Authorization": "valor del token"',
        tags: ['Seguridad'],
        consumes: ["application/json"],
        produces: ["application/json"],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        "properties": {
                            "usuario": {
                                "type": "string"
                            },
                            "contrasena": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        },
        responses: {
            '200': { "description": "OK" },
            '401': { "description": "Unauthorized" },
            '402': { "description": "Bad Request" },
            '500': { "description": "Internal Server Error" }
        }
    }
}

rutas['/perfil'] = {
    get: {
        summary: 'Consultar perfil actual',
        // description: 'Método mediante el cuál se dará de alta ',
        tags: ['Seguridad'],
        consumes: ["application/json"],
        produces: ["application/json"],
        security: [{ "bearerAuth": [] }],
        responses: {
            '200': { "description": "OK" },
            '401': { "description": "Unauthorized" },
            '402': { "description": "Bad Request" },
            '500': { "description": "Internal Server Error" }
        }
    }
}


rutas['/actualizar-perfil'] = {
    post: {
        summary: 'Método para actualizar el perfil',
        description: 'Método mediante el cuál se dará de alta la información de cada universidad. Si se indica una "nueva_contrasena" se reemplazará la que se encuentra por defecto. La url de recuperación de libro deberá ser una petición "POST" la cuál reciba en el cuerpo el valor "libro_id"',
        tags: ['Seguridad'],
        consumes: ["application/json"],
        produces: ["application/json"],
        security: [{ "bearerAuth": [] }],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        "properties": {
                            "nueva_contrasena": { "type": "string" },
                            "nombre_universidad": { "type": "string" },
                            "grupo": { "type": "string" },
                            "metodo": { "type": "string" },
                            "url_recuperacion_libro": { "type": "string" }
                        }
                    }
                }
            }
        },
        responses: {
            '200': { "description": "OK" },
            '401': { "description": "Unauthorized" },
            '402': { "description": "Bad Request" },
            '500': { "description": "Internal Server Error" }
        }
    }
}


rutas['/registrar-libro'] = {
    post: {
        summary: 'Permite registrar/o actualizar un libro',
        description: 'Es necesario proporcionar el token',
        tags: ['Libros'],
        consumes: ["application/json"],
        produces: ["application/json"],
        security: [{ "bearerAuth": [] }],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        "properties": {
                            "libro_id": { "type": "string" },
                            "libro_nombre": { "type": "string" },
                            "tema": { "type": "string" }
                        }
                    }
                }
            }
        },
        responses: {
            '200': { "description": "OK" },
            '401': { "description": "Unauthorized" },
            '402': { "description": "Bad Request" },
            '500': { "description": "Internal Server Error" }
        }
    }
}

rutas['/buscar-libro'] = {
    post: {
        summary: 'Permite realizar la búsqueda general de libros',
        description: 'Es necesario proporcionar el token',
        tags: ['Libros'],
        consumes: ["application/json"],
        produces: ["application/json"],
        security: [{ "bearerAuth": [] }],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        "properties": {
                            "filtro": { "type": "string" },
                        }
                    }
                }
            }
        },
        responses: {
            '200': { "description": "OK" },
            '401': { "description": "Unauthorized" },
            '402': { "description": "Bad Request" },
            '500': { "description": "Internal Server Error" }
        }
    }
}

rutas['/recuperar-libro'] = {
    post: {
        summary: 'Permite recuperar un libro específico',
        description: 'Es necesario proporcionar el token',
        tags: ['Libros'],
        consumes: ["application/json"],
        produces: ["application/json"],
        security: [{ "bearerAuth": [] }],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        "properties": {
                            "universidad_id": { "type": "string" },
                            "universidad_libro_id": { "type": "string" },
                        }
                    }
                }
            }
        },
        responses: {
            '200': { "description": "OK" },
            '401': { "description": "Unauthorized" },
            '402': { "description": "Bad Request" },
            '500': { "description": "Internal Server Error" }
        }
    }
}

exports.config = function (ip, port) {
    return {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "API SERVIDOR CENTRAL",
                version: "1.0.0",
                description: "Sistema Centralizado de Bibliotecas",
                license: { name: "", url: "" },
                contact: { name: "", url: "", email: "" },
            },
            paths: rutas,
            "components": {
                "securitySchemes": {
                    "bearerAuth": {
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT"
                    }
                }
            },
            servers: [
                {
                    url: `http://192.168.43.39:${port}/api`,
                    description: "Local"
                },
                {
                    url: `http://${ip}:${port}/api`,
                    description: "Remoto"
                },
                {
                    url: `http://localhost:${port}/api`,
                    description: "Local"
                },
            ],
        },
        apis: [
            // "./routes/sistemas_routes.js",
        ]
    }
}
