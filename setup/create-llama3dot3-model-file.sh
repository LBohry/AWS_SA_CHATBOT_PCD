#!/bin/bash

# Variables
model_name="llama3.3"
custom_model_name="crewai-llama3.3"

# Get the base model
ollama pull $model_name

# Create the model file
ollama create $custom_model_name -f ./Llama3dot3Modelfile