import torch
import code
import sys
import os

from shap_e.diffusion.sample import sample_latents
from shap_e.diffusion.gaussian_diffusion import diffusion_from_config
from shap_e.models.download import load_model, load_config

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

xm = load_model('transmitter', device=device)
model = load_model('text300M', device=device)
diffusion = diffusion_from_config(load_config('diffusion'))

print("Setup Done")

latents = sample_latents(
    batch_size=15,
    model=model,
    diffusion=diffusion,
    guidance_scale=4,
    model_kwargs=dict(texts=["a shark"] * 15),
    progress=True,
    clip_denoised=True,
    use_fp16=True,
    use_karras=True,
    karras_steps=64,
    sigma_min=1e-3,
    sigma_max=160,
    s_churn=0,
)

print("Latents Done")

##Need to save in good way
mesh_name = "sample"
# Example of saving the latents as meshes.
from shap_e.util.notebooks import decode_latent_mesh

print("Outputting")

for i, latent in enumerate(latents):
    t = decode_latent_mesh(xm, latent).tri_mesh()
    with open(f'example_mesh_{i}.ply', 'wb') as f:
        t.write_ply(f)
    with open(f'example_mesh_{i}.obj', 'w') as f:
        t.write_obj(f)

print("Output!")
