import { useState, useMemo } from "react";

import jsonData from "./data.json";
import { CritiqueRecord } from "./types/Critique";
import CritiqueTable from "./components/organisms/CritiqueTable";
import CritiqueDetail from "./components/organisms/CritiqueDetail";
import ChartZone from "./components/organisms/ChartZone";
import Icon from "./CROCUS_small.png";

const App = () => {
  const records:CritiqueRecord[] = jsonData

  const [currentCritique, setCurrentCritique] = useState(records[0]);

  return (
    <>
      <div className="container">
        <div className="section pb-0">
          <h1 className="title">
            <figure
              className="image is-inline-block is-48x48"
              style={{ verticalAlign: "middle" }}
            >
              <img src={Icon} alt="flower icon" />
            </figure>
            <span style={{ verticalAlign: "middle" }}>
               CROCUS (CRitique dOCUmentS) : 音楽演奏講評データセット
            </span>
          </h1>
          <p className="mb-4">
            CROCUS(CRitique dOCUmentS)
            音楽演奏講評データセットは音楽教育研究のための公開データです。複数の楽器奏者による音楽演奏とその演奏に対する複数の指導者による講評文書が収められています。
            <br />
            プロを目指す楽器演奏者がどのような「ことば」で教育を受けているか、その質的な知は広く共有されていません。プロの教育者の「ことば」の使い方を分析・類型化することにより演奏指導における「ことば」の使い方に関する知見が明らかになることを願っております。
          </p>
          <p className="mb-4">
            <a href="https://zenodo.org/record/4748243">ダウンロード先</a>
            （現在はオーボエ演奏に対する講評文書のみ収録中）
            <br />
          </p>
          <p className="mb-0">
            <span className="title is-5">発表文献</span>
            <br />
            <span className="is-no-wrap-tablet">
              松原正樹, 辻功, 平野剛, 香川璃奈:
            </span>
            <span className="is-no-wrap-tablet">
              演奏講評文書データベースの構築および講評文書の構造と効用の関係.
            </span>
            <span className="is-no-wrap-tablet">
              情報処理学会第131回音楽情報科学研究会, 2021
            </span>
          </p>
        </div>
        <div className="section">
          <div className={`columns`}>
            <div className="column  is-8">
              <CritiqueTable
                onRowClick={(c) => setCurrentCritique(c)}
                allData={records}
                currentItem={currentCritique}
              />
            </div>
            <div className="column">
              <CritiqueDetail data={currentCritique} />
            </div>
          </div>
          <div className={`columns`}>
            <div className="column is-7">
              <ChartZone records={records} currentCritique={currentCritique} />
            </div>
            <div className="column ">
              <div className="card">
                <div className="card-content">
                  <object
                    data={`./Music_Score/${currentCritique.pieceID}.pdf`}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                  >
                    <p>
                      <a
                        href={`./Music_Score/${currentCritique.pieceID}.pdf`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download Piece PDF
                      </a>
                    </p>
                  </object>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column">
              <h5 className="title is-5">プロジェクトメンバー</h5>
              <ul></ul>
              <li>
                <span className=".is-no-wrap ">
                  <a href="https://www.slis.tsukuba.ac.jp/~masaki">松原 正樹</a>
                  （筑波大学）
                  <address className="is-inline-block">
                    {" "}
                    masaki[at]slis.tsukuba.ac[dot]jp
                  </address>{" "}
                </span>
              </li>
              <li>
                <span className=".is-no-wrap ">開發 功太郎（筑波大学）</span>
              </li>
              <li>
                <span className=".is-no-wrap ">
                  辻 功（洗足音楽大学，国立音楽大学）
                </span>
              </li>
              <li>
                <span className=".is-no-wrap ">平野 剛（電気通信大学）</span>
              </li>
              <li>
                <span className="</li>.is-no-wrap ">香川璃奈（筑波大学）</span>
              </li>
            </div>
            <div className="column">
              <h5 className="title is-5">謝辞</h5>
              <p>
                データ収集にご協力いただいた協力者の皆様に深くお礼を申し上げます。
                <br />
                本プロジェクトはJST
                未来社会創造事業JPMJMI19G8「質的な知を客体化するドキュメンテーション基盤技術：芸術分野文書のフォーマット探索」の助成を受けました。
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default App;
