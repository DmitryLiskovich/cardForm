import React, {useState} from 'react';
import './card.scss'

export default function Card(){
  const card = '################'.split('');
  const [data, setData] = useState({
    cardNumber: card,
    cardName: 'FULL NAME',
    month: 'MM',
    year: 'YY',
    cvv: null,
    rotateCard: false,
    cvvRotate: false
  })

  function selectDate(e){
    const date = e.target.value.split('-');
    setData({...data, month: date[1], year: date[0]});
  }

  function changeCardName(e){
    if(!e.target.value){
      setData({...data, cardName: 'FULL NAME'});
    }else{
      setData({...data, cardName: e.target.value});
    }
  }

  function changeCvv(e){
    const numberArray = e.target.value.split('');
    if(!/^\d+$/.test(e.target.value)){
      e.preventDefault();
      numberArray.pop();
      e.target.value = numberArray.join('');
      if(!numberArray.length){
        setData({...data, cvv: ''});
      }
      return;
    }
    setData({...data, cvv: e.target.value});
  }

  function changeNumber(e){
    const numberArray = e.target.value.split('');
    const newNumber = [];
    if(!/^\d+$/.test(e.target.value)){
      e.preventDefault();
      numberArray.pop();
      e.target.value = numberArray.join('');
      if(!numberArray.length){
        setData({...data, cardNumber: card});
      }
      return;
    }
    data.cardNumber.forEach((item, index)=>{
      if(numberArray[index]){
        newNumber.push(numberArray[index]);
      }else{
        newNumber.push('#');
      }
    });
    setData({...data, cardNumber: newNumber});
  }

  function FirstSide(){
    return(
      <div className={`card-visual-wrap ${data.cvvRotate ? 'active' : ''}`}>
        <div className='card-visual-visa'></div>
        <div className='card-visual-number'>
          <div className='card-visual-number-1'>
            <span>{data.cardNumber[0]}</span>
            <span>{data.cardNumber[1]}</span>
            <span>{data.cardNumber[2]}</span>
            <span>{data.cardNumber[3]}</span>
          </div>
          <div className='card-visual-number-2'>
            <span>{data.cardNumber[4]}</span>
            <span>{data.cardNumber[5]}</span>
            <span>{data.cardNumber[6]}</span>
            <span>{data.cardNumber[7]}</span>
          </div>
          <div className='card-visual-number-3'>
            <span>{data.cardNumber[8]}</span>
            <span>{data.cardNumber[9]}</span>
            <span>{data.cardNumber[10]}</span>
            <span>{data.cardNumber[11]}</span>
          </div>
          <div className='card-visual-number-4'>
            <span>{data.cardNumber[12]}</span>
            <span>{data.cardNumber[13]}</span>
            <span>{data.cardNumber[14]}</span>
            <span>{data.cardNumber[15]}</span>
          </div>
        </div>
        <div className='card-visual-dateCvv'>
          <div>
            <div className='card-visual-dateCvv-descryption'>Card Holder</div>
            <div className='card-visual-dateCvv-name'>{data.cardName}</div>
          </div>
          <div>
            <div className='card-visual-dateCvv-descryption'>Expires</div>
            <div name='month' className='card-visual-dateCvv-dates mm'>{data.month}</div>
            <div className='card-visual-dateCvv-dates'>/</div>
            <div name='year' className='card-visual-dateCvv-dates yy'>{data.year}</div>
          </div>
        </div>
      </div>
    )
  }

  function BackSide(){
    return(
      <div className={`card-visual-wrap-mirror ${data.cvvRotate ? 'active' : ''}`}>
        <div className='card-visual-magn'></div>
        <div className='card-visual-cvv'>
          <div className='card-visual-cvv-descryption'>CVV</div>
          <div className='card-visual-cvv-dates'>{data.cvv}</div>
        </div>
      </div>
    )
  }

  function changeSide(e){
    const newState = e.type === 'focus' ? true : false;
    setData({...data, cvvRotate: newState});
    setData({...data, rotateCard: newState, cvvRotate: newState});
  }
  
  return(
    <div className="card">
      <div className={`card-visual ${data.cvvRotate ? 'active' : ''}`}>
        {/* {data.rotateCard  ? <BackSide/> : <FirstSide/>} */}
        <FirstSide/>
        <div className={`card-visual-card ${data.cvvRotate ? 'active' : ''}`}></div>
        <BackSide/> 
      </div>
      <section className='card-input'>
        <form>
          <label>Card Number</label>
          <input maxLength='16' type='text' onInput={changeNumber} name='cardNumber'></input>
          <label>Card Name</label>
          <input type='text' onInput={changeCardName} name='cardName'></input>
          <div className='card-datas'>
            <div className='card-datas-date'>
              <label>Expiration Date</label>
              <input type="month" onChange={selectDate}></input>
              {/* <select name='month' onChange={selectDate}>
                <option value='' defaultValue disabled>Month</option>
                {months.map((item, index)=><option key={index} value={item}>{item}</option>)}
              </select>
              <select name='year' onChange={selectDate}>
                <option value='' defaultValue disabled>Year</option>
                {generateYears.map((item, index)=><option key={index} value={item}>{item}</option>)}
              </select> */}
            </div>
            <div className='card-datas-cvv'>
              <label>CVV</label>
              <input 
              onFocus={changeSide} 
              onBlur={changeSide} 
              onInput={changeCvv}
              type='text' name='cardCVV'
              maxLength='4'
              ></input>
            </div>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </section>
    </div>
  )
}