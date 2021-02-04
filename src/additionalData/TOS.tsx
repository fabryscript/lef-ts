import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Paragraph } from "react-native-paper";

interface TOSProps {}

const TOS: React.FC<TOSProps> = () => {
  return (
    <ScrollView>
      <Card>
        <Card.Title>Informativa sulla Privacy</Card.Title>
        <Card.Content>
          <Paragraph>
            1. Accesso ai dati personali(art. 15 del Regolamento (UE)
            2016/679)Il sottoscritto (barrare solo le caselle che interessano):
            chiede conferma che sia o meno in corso un trattamento di dati
            personali che lo riguardano; in caso di conferma, chiede di ottenere
            l'accesso a tali dati, una copia degli stessi, e tutte le
            informazioni previste alle lettere da a) a h) dell’a rt. 15,
            paragrafo 1, del Regolamento (UE) 2016/679, e in particolare; le
            finalità del trattamento;le categorie di dati personali trattate;i
            destinatari o le categorie di destinatari a cui i dati personali
            sono stati o saranno comunicati, in particolare se destinatari di
            paesi terzi o organizzazioni internazionali;il periodo di
            conservazione dei dati personali previsto oppure, se non è
            possibile, i criteri utilizzati per determinare tale
            periodo;l’origine dei dati (ovvero il soggetto o la specifica fonte
            dalla quale essi sono stati acquisiti);l'esistenza di un processo
            decisionale automatizzato, compresa la profilazione, e le
            informazioni significative sulla logica utilizzata, nonché
            l'importanza e le conseguenze previste di tale trattamento per
            l'interessato
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default TOS;
