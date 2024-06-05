/**
 * @author Pedro
 */

let euro1, real1, real

function calcular() {
    euro1 = Number(frmMedia.txteuro.value)
    real1 = Number(frmMedia.txtreal.value)

    real = euro1 * real1

    frmMedia.txtrs.value = real.toFixed(2)
}
