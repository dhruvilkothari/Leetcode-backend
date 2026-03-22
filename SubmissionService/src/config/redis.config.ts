import  Redis from 'ioredis';
import logger from './logger.config';

const redisConfif = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    maxRetriedPerRequest: null,
}

export const redisClient = new Redis(redisConfif);

redisClient.on('connect', ()=>{
    logger.info('Connected To Redis Server');
});
redisClient.on('error', (error)=>{
    logger.info("Redis Disconnected", error);
});

export const createNewRedisConnection = ()=>{
    return new Redis(redisConfif);
}