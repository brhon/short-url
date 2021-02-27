import Shorturls from "../models/shortUrls.model.js";
import { nanoid } from "nanoid";

const rootRoutes = async (fastify, opts) => {
    fastify.post(
        "/shorturl",
        {
            schema: {
                body: {
                    type: "object",
                    properties: {
                        urlToShorten: { type: "string" },
                    },
                    required: ["urlToShorten"],
                },
            },
        },
        async (request, reply) => {
            const shortUrl = nanoid(5);

            const newShortUrl = new Shorturls({
                redirect: request.body.urlToShorten,
                shortUrl: shortUrl,
                views: 0,
            });

            await newShortUrl.save().catch((error) => {
                console.log(error);
                return fastify.httpErrors.badRequest();
            });

            return reply
                .code(200)
                .send({ shortUrl: `http://localhost:4444/${shortUrl}` });
        }
    );

    fastify.get("/:id", async (request, reply) => {
        await Shorturls.findOneAndUpdate(
            {
                shortUrl: request.params.id,
            },
            { $inc: { views: 1 } },
            { useFindAndModify: false }
        )
            .then((result) => {
                console.log(result.redirect);
                if (result) return reply.redirect(result.redirect);
            })
            .catch((error) => {
                console.log(error);
                reply.code(500).send({ error: "Internal Server Error" });
            });

        reply
            .code(400)
            .send({ error: "This shorturl does not point to any url" });
    });

    fastify.get("/:id/views", async (request, reply) => {
        await Shorturls.findOne({
            shortUrl: request.params.id,
        })
            .then((result) => {
                if (result)
                    return reply.code(200).send({ views: result.views });
            })
            .catch((error) => {
                reply.code(500).send({ error: "Internal Server Error" });
                console.log(error);
            });

        reply.code(400).send({ error: "This shorturl does not exist" });
    });
};

export default rootRoutes;
