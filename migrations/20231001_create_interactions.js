// Migration script for creating the interactions collection
const { MongoClient } = require('mongodb');

module.exports = {
    up: async (db) => {
        await db.createCollection('interactions', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['userId', 'contentId', 'action'],
                    properties: {
                        userId: {
                            bsonType: 'objectId',
                            description: 'must be an objectId and is required'
                        },
                        contentId: {
                            bsonType: 'objectId',
                            description: 'must be an objectId and is required'
                        },
                        action: {
                            enum: ['view', 'like', 'share'],
                            description: 'can only be one of the enum values and is required'
                        }
                    }
                }
            }
        });
        await db.collection('interactions').createIndex({ userId: 1, contentId: 1 }, { unique: true });
    },
    down: async (db) => {
        await db.dropCollection('interactions');
    }
};
