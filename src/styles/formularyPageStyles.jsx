import styled from '@emotion/styled'


const FormularyPageStyles = styled.div`
  font-family: 'MJ-TeX-main-regular', serif;
  body {
    counter-reset: h2;
  }
  a {
    font-family: 'MJ-TeX-main-regular';
  }
  h1 {
    font-family: 'MJ-TeX-main-bold';
  }
  h2 {
    font-family: 'MJ-TeX-main-bold';
    &::before {
      counter-increment: section-counter;
      content: counter(section-counter) '. ';
    }
  }
  h3 {
    font-family: 'MJ-TeX-main-bold';
  }
  h4 {
    font-family: 'MJ-TeX-main-italic';
  }
  table {
    th {
      font-family: 'MJ-TeX-main-bold';
    }
  }
`

export default FormularyPageStyles