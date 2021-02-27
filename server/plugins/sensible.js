import fp from "fastify-plugin";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
const sensiblePlugin = async (fastify, opts) => {
  fastify.register(import("fastify-sensible"), {
    errorHandler: false,
  });
};

export default fp(sensiblePlugin);
