import fp from "fastify-plugin";

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

const someSupportPlugin = async (fastify, opts) => {
  fastify.decorate("someSupport", function () {
    return "hugs";
  });
};

export default fp(someSupportPlugin);
