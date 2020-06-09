#!/bin/bash

rm -rf build tmp df-react-example-application.dfpkg
yarn react-scripts build && \
mkdir tmp && \
cp data/*.json tmp/ && \
cp description.json tmp/ && \
mv build/* tmp/ && \
cd tmp && \
zip -r -X ../df-react-example-application.dfpkg * && \
cd .. && \
rm -rf tmp
