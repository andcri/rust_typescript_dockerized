FROM ubuntu:20.04

# muslc is required in order to build the rust image.
RUN apt-get update && apt-get -y install ca-certificates curl build-essential

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

ENV PATH="/root/.cargo/bin:${PATH}"

COPY . /srv/api

WORKDIR /srv/api

RUN cargo install systemfd cargo-watch

RUN cargo build