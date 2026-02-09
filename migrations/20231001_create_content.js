// Migration script for creating the content collection
const { MongoClient } = require('mongodb');

module.exports = {
    up: async (db) => {
        await db.createCollection('content', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['title', 'description', 'createdBy'],
                    properties: {
                        title: {
                            bsonType: 'string',
                            description: 'must be a string and is required'
                        },
                        description: {
                            bsonType: 'string',
                            description: 'must be a string and is required'
                        },
                        createdBy: {
                            bsonType: 'objectId',
                            description: 'must be an objectId and is required'
                        }
                    }
                }
            }
        });
        await db.collection('content').createIndex({ createdBy: 1 });
    },
    down: async (db) => {
        await db.dropCollection('content');
    }
};
