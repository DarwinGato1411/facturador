import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'tabprincipal',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./usuario/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./usuario/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'tabprincipal',
    loadChildren: () => import('./tabmenu/tabprincipal/tabprincipal.module').then( m => m.TabprincipalPageModule)
  },
  {
    path: 'listar',
    loadChildren: () => import('./servicioproducto/listar/listar.module').then( m => m.ListarPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./servicioproducto/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'servicio',
    loadChildren: () => import('./servicioproducto/servicio/servicio.module').then( m => m.ServicioPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./servicioproducto/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./deckxel/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'cvv',
    loadChildren: () => import('./web/cvv/cvv.module').then( m => m.CvvPageModule)
  },
  {
    path: 'hojavida',
    loadChildren: () => import('./persona/hojavida/hojavida.module').then( m => m.HojavidaPageModule)
  },
  {
    path: 'crearservicio',
    loadChildren: () => import('./persona/crearservicio/crearservicio.module').then( m => m.CrearservicioPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./persona/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'misservicios',
    loadChildren: () => import('./persona/misservicios/misservicios.module').then( m => m.MisserviciosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./persona/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  
  {
    path: 'turismo',
    loadChildren: () => import('./servicioproducto/turismo/turismo.module').then( m => m.TurismoPageModule)
  },
  {
    path: 'tourvirtual',
    loadChildren: () => import('./servicioproducto/tourvirtual/tourvirtual.module').then( m => m.TourvirtualPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./servicioproducto/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./persona/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'listafactura',
    loadChildren: () => import('./factura/listafactura/listafactura.module').then( m => m.ListafacturaPageModule)
  },
  {
    path: 'facturar',
    loadChildren: () => import('./factura/facturar/facturar.module').then( m => m.FacturarPageModule)
  },
  {
    path: 'crearCliente',
    children: [
      {
        path: '',
        loadChildren: () => import('./factura/crear-cliente/crear-cliente.module').then(m=>m.CrearClientePageModule)
      }
    ]
  },
  {
    path: 'buscarcliente',
    loadChildren: () => import('./factura/buscarcliente/buscarcliente.module').then( m => m.BuscarclientePageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./usuario/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'crear-cliente',
    loadChildren: () => import('./factura/crear-cliente/crear-cliente.module').then( m => m.CrearClientePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
