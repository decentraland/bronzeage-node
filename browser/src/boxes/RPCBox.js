import React from 'react'
import './RPCBox.css'
import './Box.css'


export default function RPCBox() {
  return <div className="Box rpc">
    <h2>RPC</h2>

    <div>
      <form id="js-rpc-form" method="POST" action="/rpccall" className="rpc-form">
        <input type="text" name="cmd" className="input input-cmd" placeholder="RPC command (e.g. startmining, stopmining, getblockchaininfo)" />
        <input type="submit" className="input input-send" value="SEND" />
      </form>

      <pre id="js-rpc-result" className="input rpc-result scrolleable">RPC result goes here</pre>
    </div>
  </div>
}
