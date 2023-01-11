FROM node:18-alpine
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g pnpm

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . .

RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store pnpm fetch
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store pnpm install -r --offline

ENV NODE_OPTIONS=--max_old_space_size=16000
RUN pnpm build

ARG ALGOLIA_APP_ID
ENV ALGOLIA_APP_ID=${ALGOLIA_APP_ID}
ARG ALGOLIA_API_KEY
ENV ALGOLIA_API_KEY=${ALGOLIA_API_KEY}

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV PORT=3000

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]