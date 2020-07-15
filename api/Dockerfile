FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get -y install ca-certificates curl build-essential libpq-dev pkg-config libssl-dev clang

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

ENV PATH="/root/.cargo/bin:${PATH}"

COPY . /srv/api

WORKDIR /srv/api

RUN cargo install diesel_cli --no-default-features --features postgres

RUN cargo install systemfd cargo-watch

RUN cargo build
