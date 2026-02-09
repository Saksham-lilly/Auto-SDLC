// Migration script for creating the users collection
const { MongoClient } = require('mongodb');

module.exports = {
    up: async (db) => {
        await db.createCollection('users', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['username', 'email', 'password'],
                    properties: {
                        username: {
                            bsonType: 'string',
                            description: 'must be a string and is required'
                        },
                        email: {
                            bsonType: 'string',
                            description: 'must be a string and is required'
                        },
                        password: {
                            bsonType: 'string',
                            description: 'must be a string and is required'
                        }
                    }
                }
            }
        });
        await db.collection('users').createIndex({ email: 1 }, { unique: true });
    },
    down: async (db) => {
        await db.dropCollection('users');
    }
};
