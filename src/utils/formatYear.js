export function formatYear(date){
    
    const formatYear = date?.split('-')[0]
    return date ? formatYear : '0000';
  }