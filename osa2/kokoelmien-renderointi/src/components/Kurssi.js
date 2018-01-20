import React from 'react'
import Otsikko from '../components/Otsikko'
import Sisalto from '../components/Sisalto'
import Yhteensa from '../components/Yhteensa'

const Kurssi = ({ kurssi }) => {
    return (
      [
          <Otsikko key={"otsikko"} text={kurssi.otsikko.text}/>,
          <Sisalto key={"sisalto"} osat={kurssi.osat}/>,
          <Yhteensa key={"yhteensa"} osat={kurssi.osat}/>
      ]
    )
}

export default Kurssi