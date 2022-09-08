export function valueFormat(data:any) {
    const val = data.target.value
      .replace(/\D/g, '')
      .replace(/^0*/, '')
      .padStart(3, '0');
  
    data.target.value =
      'R$ ' +
      val.slice(0, -2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
      ',' +
      val.slice(-2);
}