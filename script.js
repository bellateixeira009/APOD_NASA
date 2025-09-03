const hoje = new Date().toISOString().split('T')[0];
//2025-08-06T14:00:00Z

const dataInput = document.getElementById('dataInput');
const btnBuscar = document.getElementById('btnBuscar');
const tituloImg = document.getElementById('tituloImg');
const descricao = document.getElementById('descricao');
const imagem = document.getElementById('imagem');
const link = document.getElementById('link');

const key = 'vnwggYnbf98edTV4Vpmrb42VVCiLKhCc2BGCHjbp';

dataInput.max = hoje;
dataInput.value = hoje;

async function buscarImagemAstronomia() {
  const data = dataInput.value;
  tituloImg.textContent = 'Carregando...';
  descricao.textContent = '';
  imagem.src = '';
  imagem.style.display = 'none';
  link.style.display = 'none'
  link.href = '';

  const iframeExistente = document.querySelector('iframe');
  if (iframeExistente) iframeExistente.remove();

  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${data}`);
    if (!res.ok) throw new Error('Erro na requisição');

    const dados = await res.json();

    tituloImg.textContent = dados.title; // corrigido
    descricao.textContent = dados.explanation;
    link.href = dados.url;
    link.textContent = 'Ver na NASA';

    if (dados.media_type === 'image') {
      imagem.src = dados.url;
      imagem.alt = dados.title;
      imagem.style.display = 'block';
      link.style.display = 'inline';
    } else if (dados.media_type === 'video') {
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '400';
      iframe.src = dados.url;
      iframe.allowFullscreen = true;
      iframe.frameBorder = '0';

      document.getElementById('resultado').insertBefore(iframe, descricao);
    }
  } catch (error) {
    tituloImg.textContent = 'Erro ao carregar a imagem.'; // corrigido
    descricao.textContent = '';
    imagem.style.display = 'none';
    link.href = '';
    console.error(error);
  }
}

btnBuscar.addEventListener('click', buscarImagemAstronomia);
window.addEventListener('load', buscarImagemAstronomia);
